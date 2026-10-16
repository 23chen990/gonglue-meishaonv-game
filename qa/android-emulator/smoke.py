#!/usr/bin/env python3
"""Real Android Emulator + installed Chrome over ADB/CDP.

This is NOT desktop Playwright's 'isMobile' emulation. Chrome runs *inside*
the Android AVD; Playwright attaches to the device's DevTools socket.
"""
from pathlib import Path
import hashlib
import json
import os
import re
import subprocess
import sys
import time
import xml.etree.ElementTree as ET

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
H5 = ROOT / "runs/20260831-010324-village-south-text-v1/workspace/game/four-heroine-r4"
SHA = hashlib.sha256((H5 / "data/STORY.json").read_bytes()).hexdigest()
EXPECTED = "84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93"
URL = "http://10.0.2.2:8765/index.html"
OUT = Path(os.environ.get("RUNNER_TEMP", "/tmp")) / "android-native-evidence"
OUT.mkdir(parents=True, exist_ok=True)
REPORT = {"scope": "Real Android 35 emulator, installed Chrome CDP, ADB simulator screenshots",
          "story_sha256": SHA, "cases": [], "status": "FAIL"}
assert SHA == EXPECTED, "Refuse testing an unexpected canonical story."


def adb(*args, timeout=45, check=True):
    result = subprocess.run(["adb", *args], stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE, timeout=timeout)
    if check and result.returncode:
        raise RuntimeError("ADB failed: " + repr(args) + " " +
                           result.stderr.decode(errors="replace")[:600])
    return result.stdout.decode(errors="replace")


def screenshot(name):
    screenshot_path = OUT / name
    screenshot_path.write_bytes(
        subprocess.check_output(["adb", "exec-out", "screencap", "-p"], timeout=40)
    )
    assert screenshot_path.stat().st_size > 10000, "Screenshot is blank or missing."
    return str(screenshot_path)


def dump_xml(name):
    adb("shell", "uiautomator", "dump", "/sdcard/window.xml", timeout=50)
    xml = adb("exec-out", "cat", "/sdcard/window.xml")
    (OUT / name).write_text(xml, encoding="utf-8")
    return ET.fromstring(xml[xml.find("<hierarchy"):])


def adb_tap_labeled(root, parts):
    for node in root.iter("node"):
        content = (node.attrib.get("text", "") + " " +
                   node.attrib.get("content-desc", "")).lower()
        if any(p.lower() in content for p in parts):
            bounds = re.findall(r"\[(\d+),(\d+)\]", node.attrib.get("bounds", ""))
            if len(bounds) == 2:
                a,b = bounds
                x,y = (int(a[0])+int(b[0]))//2, (int(a[1])+int(b[1]))//2
                adb("shell", "input", "tap", str(x), str(y))
                print("Android OS-level tap", content[:75], x, y, flush=True)
                return True
    return False


def ensure_chrome():
    pkg = adb("shell", "pm", "list", "packages", "com.android.chrome")
    if "package:com.android.chrome" not in pkg:
        raise RuntimeError("CHROME_NOT_INSTALLED_IN_AVD: cannot claim Android Chrome testing")
    adb("shell", "am", "start", "-W", "-a", "android.intent.action.VIEW",
        "-d", URL, "-p", "com.android.chrome", timeout=45)
    for attempt in range(4):
        time.sleep(3)
        try:
            tree = dump_xml("chrome-launch-setup.xml")
            if adb_tap_labeled(tree, ["accept & continue", "use without an account",
                                      "no thanks", "not now", "continue without",
                                      "skip"]):
                continue
        except Exception as ex:
            print("Chrome welcome UI inspection:", repr(ex), flush=True)
        break
    adb("shell", "am", "start", "-W", "-a", "android.intent.action.VIEW",
        "-d", URL, "-p", "com.android.chrome", timeout=45)


def main():
    info = {"android_version": adb("shell", "getprop", "ro.build.version.release").strip(),
            "chrome_version": adb("shell", "dumpsys", "package", "com.android.chrome",
                                  timeout=30)[-1000:]}
    REPORT["device"] = info
    print("ANDROID_REAL_EMULATOR", info["android_version"], flush=True)
    ensure_chrome()
    screenshot("00-chrome-launched.png")
    adb("forward", "tcp:9222", "localabstract:chrome_devtools_remote")
    with sync_playwright() as pw:
        browser = None
        for _ in range(15):
            try:
                browser = pw.chromium.connect_over_cdp("http://127.0.0.1:9222", timeout=5000)
                break
            except Exception as exc:
                print("Waiting for real Android Chrome CDP:", str(exc)[:160], flush=True)
                time.sleep(2)
        assert browser is not None, "Android Chrome DevTools socket unavailable"
        contexts = browser.contexts
        assert contexts, "Android browser did not expose any context"
        pages = [p for c in contexts for p in c.pages]
        assert pages, "Android Chrome has no page"
        page = next((p for p in pages if "10.0.2.2" in p.url), pages[0])
        page.set_default_timeout(10000)
        if not "10.0.2.2" in page.url:
            page.goto(URL, wait_until="domcontentloaded", timeout=25000)
        page.wait_for_selector(".vn-frame", timeout=30000)
        ua = page.evaluate("navigator.userAgent")
        assert "Android" in ua and "Chrome" in ua, "Connected to wrong browser: " + ua
        assert page.locator('meta[name="story-sha256"]').get_attribute("content") == EXPECTED
        assert page.locator("body").get_attribute("data-current") == "ENTRY_WAKE"
        assert page.locator("[data-choice]").count() == 0
        screenshot("01-native-android-first-page.png")
        page.screenshot(path=str(OUT / "01-chrome-cdp-first-page.png"))
        REPORT["cases"].append({"name":"REAL_ANDROID_CHROME_CANONICAL_FIRST_PAGE","status":"PASS","ua":ua})

        native_tap = "NOT_EXPOSED"
        before = page.locator(".vn-frame").get_attribute("data-reader-key")
        try:
            tree = dump_xml("android-accessibility-first-page.xml")
            if adb_tap_labeled(tree, ["继续阅读"]):
                time.sleep(1)
                after = page.locator(".vn-frame").get_attribute("data-reader-key")
                assert after != before, "ADB native touch failed to advance the H5"
                native_tap = "PASS"
        except Exception as e:
            raise AssertionError("ADB real touch probe failed: " + repr(e))
        completed = 1 if native_tap == "PASS" else 0
        for _ in range(completed,7):
            btn = page.locator("[data-page-next]")
            assert btn.count() == 1, "Required prologue action hidden before the decision"
            btn.tap()
        assert not page.locator("[data-page-next]").count()
        options=page.locator(".vn-dock [data-choice]").evaluate_all(
            "(buttons)=>buttons.map(b=>({id:b.dataset.choice,height:b.getBoundingClientRect().height}))")
        assert [o["id"] for o in options] == ["canon","rescue","investigate"], options
        assert all(o["height"]>=44 for o in options), options
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        screenshot("02-android-three-opening-choices.png")
        page.screenshot(path=str(OUT / "02-chrome-cdp-decision.png"))
        REPORT["cases"].append({"name":"SEVEN_PAGES_AND_THREE_REAL_CHOICES","status":"PASS",
                                "adb_native_tap":native_tap,"buttons":options})
        page.locator('[data-choice="investigate"]').tap()
        save=json.loads(page.evaluate("(k)=>localStorage.getItem(k)",
                                      "gonglue:revision-r4.5-portrait:canonical"))
        assert [x["id"] for x in save["commands"]] == ["investigate"]
        screenshot("03-android-post-choice.png")
        page.reload(wait_until="domcontentloaded")
        assert page.locator("body").get_attribute("data-current") != "ENTRY_WAKE"
        new_save=json.loads(page.evaluate("(k)=>localStorage.getItem(k)",
                                          "gonglue:revision-r4.5-portrait:canonical"))
        assert new_save["commands"]==save["commands"], "Android Chrome lost persisted game state"
        REPORT["cases"].append({"name":"ANDROID_CHROME_PERSISTENCE_AND_REAL_CHOICE","status":"PASS"})
        browser.close()
    REPORT["status"] = "PASS"


if __name__=="__main__":
    try:
        main()
    except Exception as e:
        REPORT["error"]=repr(e)
        print("ANDROID_EMULATOR_QA_FAIL",repr(e),flush=True)
        try: screenshot("failure.png")
        except Exception: pass
        raise
    finally:
        (OUT/"report.json").write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+"\n")
        print("ANDROID_EMULATOR_QA_REPORT",REPORT["status"],flush=True)

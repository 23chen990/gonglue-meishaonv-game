#!/usr/bin/env python3
"""v4.16: fail-closed, exactly reversible first-night body/reply/choice-label patch.

Only the 28 rows in patch/v416_first_night_plan.json are permitted.
The caller must rebuild generated HTML and source contracts after --apply.
"""
import argparse
import copy
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "data/STORY.json"
PLAN = ROOT / "patch/v416_first_night_plan.json"
PATCH = ROOT / "patch/v416_first_night_edits.json"
SERIALIZE = lambda obj: (json.dumps(obj, ensure_ascii=False, indent=2) + "\n").encode()
SHA = lambda raw: hashlib.sha256(raw).hexdigest()
BEAT_HASH = lambda b: SHA((b["speaker"] + "\0" + b["text"]).encode())[:16]
EXPECTED_COUNTS = {"beats": 28, "scenes": 13, "body": 11, "reply": 13, "labels": 4}

def check_shape(data):
    scenes = data["scenes"]
    assert len(scenes) == 228, "scene count"
    assert sum(len(s["choices"]) for s in scenes.values()) == 751, "historical choices"
    assert sum(s["kind"] == "ending" for s in scenes.values()) == 24, "main endings"
    assert len(scenes["ENTRY_WAKE"]["body"]) == 28, "mandatory prologue"
    assert [c["id"] for c in scenes["ENTRY_WAKE"]["choices"]] == ["canon", "rescue", "investigate"]
    assert sum(bool(s.get("decisionSteps")) for s in scenes.values()) == 16, "two-stage decisions"

def lookup(story, c):
    scene = story["scenes"][c["scene"]]
    loc = c["location"]
    if loc == "body":
        result = next((x for x in scene["body"] if x["id"] == c["id"]), None)
    elif loc == "reply":
        option = next(o for o in scene["choices"] if o["id"] == c["choice"])
        result = next((x for x in option["reply"] if x["id"] == c["id"]), None)
    elif loc == "label":
        assert c["id"] == c["scene"] + "." + c["choice"] + ".label"
        result = next((o for o in scene["choices"] if o["id"] == c["choice"]), None)
    else:
        raise AssertionError("Not an allowed field: " + str(loc))
    assert result is not None, c["id"]
    if loc != "label":
        assert result["speaker"] == c["speaker"], c["id"]
    return result

def restore(data, patch, plan):
    assert patch["counts"] == plan["counts"] == EXPECTED_COUNTS
    assert patch["baseStorySha256"] == plan["baseStorySha256"]
    assert len(patch["changes"]) == len(plan["changes"]) == 28
    wanted = {(x["scene"], x["location"], x["id"]): x for x in plan["changes"]}
    assert len(wanted) == 28, "duplicate semantic targets"
    restored = copy.deepcopy(data)
    for c in reversed(patch["changes"]):
        key = (c["scene"], c["location"], c["id"])
        expected = wanted[key]
        assert c.get("choice") == expected.get("choice"), c["id"]
        assert c["after"] == expected["text"], c["id"]
        row = lookup(restored, c)
        if c["location"] == "label":
            assert row["label"] == c["after"], c["id"]
            row["label"] = c["before"]
        else:
            assert row["text"] == c["after"], c["id"]
            assert row["textHash"] == c["afterHash"] == BEAT_HASH(row), c["id"]
            row["text"] = c["before"]
            row["textHash"] = c["beforeHash"]
            assert row["textHash"] == BEAT_HASH(row), c["id"]
    check_shape(restored)
    assert SHA(SERIALIZE(restored)) == patch["baseStorySha256"], "Exact predecessor SHA mismatch / unauthorized mutation"

def main():
    ap = argparse.ArgumentParser()
    grp = ap.add_mutually_exclusive_group(required=True)
    grp.add_argument("--dry-run", action="store_true")
    grp.add_argument("--apply", action="store_true")
    grp.add_argument("--check", action="store_true")
    args = ap.parse_args()
    raw = SOURCE.read_bytes()
    story = json.loads(raw)
    plan = json.loads(PLAN.read_text(encoding="utf-8"))
    p415 = json.loads((ROOT / "patch/v415_first_night_edits.json").read_text(encoding="utf-8"))
    assert plan["baseStorySha256"] == p415["newStorySha256"], "Unknown v4.15 predecessor"
    assert plan["counts"] == EXPECTED_COUNTS
    assert plan["scope"].startswith("Only existing body.text/reply.text/textHash")
    check_shape(story)
    if args.check:
        assert PATCH.exists(), "v4.16 edit audit not yet applied"
        patch = json.loads(PATCH.read_text(encoding="utf-8"))
        assert SHA(raw) == patch["newStorySha256"], "Applied v4.16 SHA differs"
        restore(story, patch, plan)
        print("PASS v4.16 exact reversible text/labels", patch["newStorySha256"])
        return
    assert SHA(raw) == p415["newStorySha256"], "Unrecognized baseline; refuse to touch story"
    assert not PATCH.exists(), "v4.16 audit patch already present; refuse reapply"
    output = copy.deepcopy(story)
    changes = []
    seen = set()
    for item in plan["changes"]:
        key = (item["scene"], item["location"], item["id"])
        assert key not in seen, "duplicate " + str(key)
        seen.add(key)
        row = lookup(output, item)
        change = {k: v for k, v in item.items() if k != "text"}
        if item["location"] == "label":
            assert row["label"] != item["text"], item["id"]
            change["before"] = row["label"]
            row["label"] = item["text"]
            change["after"] = row["label"]
        else:
            assert row["text"] != item["text"], item["id"]
            assert row["textHash"] == BEAT_HASH(row), item["id"]
            change["before"] = row["text"]
            change["beforeHash"] = row["textHash"]
            row["text"] = item["text"]
            row["textHash"] = BEAT_HASH(row)
            change["after"] = row["text"]
            change["afterHash"] = row["textHash"]
        changes.append(change)
    check_shape(output)
    packed = SERIALIZE(output)
    patch = {
        "version": "v4.16",
        "baseStorySha256": SHA(raw),
        "newStorySha256": SHA(packed),
        "counts": plan["counts"],
        "scope": "Only existing body/reply text, textHash and four labels",
        "changes": changes
    }
    restore(output, patch, plan)
    if args.apply:
        SOURCE.write_bytes(packed)
        PATCH.write_bytes(SERIALIZE(patch))
        print("APPLIED v4.16: 28 verified edits / 13 scenes; source SHA", patch["newStorySha256"])
    else:
        print("DRY RUN PASS; no files written; would produce", patch["newStorySha256"])

if __name__ == "__main__":
    main()

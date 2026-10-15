#!/usr/bin/env python3
"""v4.17 P0: bounded and exactly reversible first-night copy changes.

Fail closed unless the canonical v4.16 STORY bytes and all 17 planned
speaker / ID / text / textHash preconditions match. No graph or UI edits.
"""
import argparse
import copy
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORY = ROOT / "data/STORY.json"
PLAN = ROOT / "patch/v417_p0_scene_plan.json"
AUDIT = ROOT / "patch/v417_p0_scene_edits.json"
COUNTS = {"beats": 17, "scenes": 10, "body": 2, "reply": 15}


def pack(obj):
    return (json.dumps(obj, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def beat_hash(row):
    return sha((row["speaker"] + "\0" + row["text"]).encode("utf-8"))[:16]


def shape(story):
    scenes = story["scenes"]
    assert len(scenes) == 228, "228 canonical scenes"
    assert sum(len(s["choices"]) for s in scenes.values()) == 751, "751 original actions"
    assert sum(s["kind"] == "ending" for s in scenes.values()) == 24, "24 endings"
    assert len(scenes["ENTRY_WAKE"]["body"]) == 28, "28 mandatory opening beats"
    assert [c["id"] for c in scenes["ENTRY_WAKE"]["choices"]] == [
        "canon", "rescue", "investigate"
    ], "three original first decisions"
    assert sum(bool(s.get("decisionSteps")) for s in scenes.values()) == 16, "16 real intent stages"


def locate(story, item):
    scene = story["scenes"][item["scene"]]
    if item["location"] == "body":
        rows = scene["body"]
    elif item["location"] == "reply":
        choice = next(x for x in scene["choices"] if x["id"] == item["choice"])
        rows = choice["reply"]
    else:
        raise AssertionError("Only body/reply text is permitted")
    hits = [x for x in rows if x["id"] == item["id"]]
    assert len(hits) == 1, item["id"]
    row = hits[0]
    assert row["speaker"] == item["speaker"], item["id"]
    assert row["textHash"] == beat_hash(row), item["id"]
    return row


def validate_plan(plan, predecessor):
    assert plan["version"] == "v4.17-p0-continuity"
    assert plan["counts"] == COUNTS
    assert plan["baseStorySha256"] == predecessor["newStorySha256"], "Unknown v4.16 baseline"
    rows = plan["changes"]
    assert len(rows) == COUNTS["beats"]
    assert len({x["scene"] for x in rows}) == COUNTS["scenes"]
    assert sum(x["location"] == "body" for x in rows) == COUNTS["body"]
    assert sum(x["location"] == "reply" for x in rows) == COUNTS["reply"]
    keys = [(x["scene"], x["location"], x.get("choice"), x["id"]) for x in rows]
    assert len(set(keys)) == len(keys), "Duplicate edit targets"
    for x in rows:
        assert x["text"] and x["before"] and x["text"] != x["before"], x["id"]
        assert x["beforeHash"] == sha(
            (x["speaker"] + "\0" + x["before"]).encode("utf-8")
        )[:16], "Plan baseline text digest mismatch: " + x["id"]


def restore_after(changed, audit, plan):
    assert audit["counts"] == plan["counts"] == COUNTS
    assert audit["baseStorySha256"] == plan["baseStorySha256"]
    assert len(audit["changes"]) == len(plan["changes"])
    predecessor = copy.deepcopy(changed)
    exact = {x["id"]: x for x in plan["changes"]}
    for ch in reversed(audit["changes"]):
        p = exact[ch["id"]]
        assert ch["location"] == p["location"]
        assert ch.get("choice") == p.get("choice")
        assert ch["after"] == p["text"]
        assert ch["before"] == p["before"]
        assert ch["beforeHash"] == p["beforeHash"]
        row = locate(predecessor, ch)
        assert row["text"] == ch["after"] and row["textHash"] == ch["afterHash"], ch["id"]
        row["text"] = ch["before"]
        row["textHash"] = ch["beforeHash"]
        assert row["textHash"] == beat_hash(row), ch["id"]
    shape(predecessor)
    assert sha(pack(predecessor)) == audit["baseStorySha256"], "Unpermitted story mutation"


def main():
    cli = argparse.ArgumentParser()
    modes = cli.add_mutually_exclusive_group(required=True)
    modes.add_argument("--dry-run", action="store_true")
    modes.add_argument("--apply", action="store_true")
    modes.add_argument("--check", action="store_true")
    args = cli.parse_args()

    raw = STORY.read_bytes()
    data = json.loads(raw)
    plan = json.loads(PLAN.read_text(encoding="utf-8"))
    previous = json.loads((ROOT / "patch/v416_first_night_edits.json").read_text(encoding="utf-8"))
    validate_plan(plan, previous)
    shape(data)

    if args.check:
        assert AUDIT.is_file(), "Missing applied v4.17 audit"
        audit = json.loads(AUDIT.read_text(encoding="utf-8"))
        assert sha(raw) == audit["newStorySha256"], "Canonical v4.17 SHA drift"
        restore_after(data, audit, plan)
        print("PASS v4.17 exact rollback to v4.16", audit["newStorySha256"])
        return

    assert sha(raw) == plan["baseStorySha256"], "Refuse: unexpected or already edited STORY.json"
    assert not AUDIT.exists(), "Refuse: audit already exists"
    latest = copy.deepcopy(data)
    changes = []
    for p in plan["changes"]:
        row = locate(latest, p)
        assert row["text"] == p["before"], "Old text drift: " + p["id"]
        assert row["textHash"] == p["beforeHash"], "Old beat hash drift: " + p["id"]
        row["text"] = p["text"]
        row["textHash"] = beat_hash(row)
        changes.append({
            "scene": p["scene"], "location": p["location"],
            **({"choice": p["choice"]} if "choice" in p else {}),
            "id": p["id"], "speaker": p["speaker"], "reason": p["reason"],
            "before": p["before"], "beforeHash": p["beforeHash"],
            "after": row["text"], "afterHash": row["textHash"],
        })
    shape(latest)
    packed = pack(latest)
    audit = {
        "version": "v4.17-p0-continuity",
        "baseStorySha256": sha(raw),
        "newStorySha256": sha(packed),
        "counts": COUNTS,
        "scope": "Only 17 existing first-night body/reply text and corresponding textHash",
        "changes": changes,
    }
    restore_after(latest, audit, plan)
    if args.apply:
        STORY.write_bytes(packed)
        AUDIT.write_bytes(pack(audit))
        print("APPLIED v4.17 P0: 17 exact edits / 10 scenes", audit["newStorySha256"])
    else:
        print("PASS v4.17 P0 dry-run; would produce", audit["newStorySha256"])


if __name__ == "__main__":
    main()

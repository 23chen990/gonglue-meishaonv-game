#!/usr/bin/env python3
"""Install this r4 package into a CLEAN, isolated local branch. No commit, push or main overwrite."""
from pathlib import Path
import argparse,subprocess,shutil,json
SOURCE=Path(__file__).resolve().parent.parent
REL=Path("runs/20260831-010324-village-south-text-v1/workspace/game")
p=argparse.ArgumentParser()
p.add_argument("--repo",type=Path,required=True)
p.add_argument("--expected-head",required=True,help="SHA verified by the operator immediately before integration")
p.add_argument("--branch",default="codex/book-entry-r4-20261012")
args=p.parse_args();repo=args.repo.resolve()
def git(*xs):
 return subprocess.check_output(["git","-C",str(repo),*xs],text=True).strip()
if git("rev-parse","HEAD")!=args.expected_head:raise SystemExit("HEAD changed: inspect remote/local changes; do not force.")
if git("status","--porcelain"):raise SystemExit("Working tree is not clean. Preserve user changes first.")
if args.branch in ["main","master"]:raise SystemExit("An isolated development branch is required.")
origin=git("remote","get-url","origin")
if "23chen990/gonglue-meishaonv-game" not in origin:raise SystemExit("Wrong origin: "+origin)
game=repo/REL;target=game/"four-heroine-r4"
for f in [game/"src/main.ts",game/"index.html"]:
 if not f.is_file():raise SystemExit("Expected runtime file missing: "+str(f))
if target.exists():raise SystemExit("four-heroine-r4 already exists. Inspect it; this installer never overwrites a prior delivery.")
if SOURCE==target or repo in SOURCE.parents:raise SystemExit("Keep the unzipped delivery outside the target worktree.")
# Creating a branch is local only. Git refuses an existing branch rather than resetting it.
subprocess.run(["git","-C",str(repo),"switch","-c",args.branch],check=True)
shutil.copytree(SOURCE,target,ignore=shutil.ignore_patterns("__pycache__","*.pyc",".git","node_modules"))
back=target/"provenance/repository_prior_entry";back.mkdir(parents=True,exist_ok=True)
shutil.copy2(game/"src/main.ts",back/"main.ts")
shutil.copy2(game/"index.html",back/"index.html")
(game/"src/main.ts").write_text("// r4 canonical runtime; prior entry is preserved in provenance.\nimport '../four-heroine-r4/runtime.mjs';\n")
shutil.copy2(target/"repository-index.html",game/"index.html")
(back/"receipt.json").write_text(json.dumps({"inputHead":args.expected_head,"origin":origin,"branch":args.branch,
"entry":str(REL/"src/main.ts"),"runtime":str(REL/"four-heroine-r4/runtime.mjs"),
"remoteWrites":False,"nativeQA":"NOT_RUN"},indent=2)+"\n")
print("Installed on local branch only:",args.branch)
print("Run npm run verify inside",target)
print("Then run the repository's declared verify/build and tools/ci-acceptance.py. Do not merge while a release gate is BLOCKED.")

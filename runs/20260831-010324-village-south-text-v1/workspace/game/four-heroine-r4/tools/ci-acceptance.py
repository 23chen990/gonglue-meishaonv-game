#!/usr/bin/env python3
"""Current-repo build and native QA runner; records failures; installs no global tools/dependencies."""
from pathlib import Path
import os,sys,json,hashlib,subprocess,time,urllib.request
M=Path(__file__).resolve().parent.parent
REPO=next((p for p in M.parents if (p/".git").exists()),None)
if REPO is None:raise SystemExit("Run after local integration into the actual git worktree.")
GAME=M.parent;Q=M/"qa/ci";Q.mkdir(parents=True,exist_ok=True)
report={"scope":"Checked-out default entry + native browser; not phone/human/platform release",
"inputHead":subprocess.check_output(["git","-C",str(REPO),"rev-parse","HEAD"],text=True).strip(),"stages":[]}
def save(): (Q/"acceptance.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n")
def stage(name,args,cwd=M,env=None,timeout=1200):
 with (Q/(name+".log")).open("w") as log:
  try:code=subprocess.run(args,cwd=cwd,env=env or os.environ,stdout=log,stderr=subprocess.STDOUT,timeout=timeout).returncode
  except Exception as e:log.write(str(e));code=125
 report["stages"].append({"name":name,"status":"PASS" if code==0 else ("BLOCKED" if code==2 else "FAIL"),"code":code,"command":args,"log":str(Q/(name+".log"))})
 save();return code==0
ok=stage("canonical-source",["npm","run","verify"])
# A build must not silently correct a stale checked-in default HTML shell.
# This gate forces authors to commit the generated parent game/index.html too.
entry_tracked=stage("default-entry-tracked",["git","diff","--exit-code","--",str((M.parent/"index.html").relative_to(REPO))],cwd=REPO) if ok else False
repo_ok=stage("repository-verify",["pnpm","verify"],cwd=REPO) if ok and entry_tracked else False
entry=GAME/"src/main.ts";doc=GAME/"dist/index.html"
wired=entry.is_file() and "import '../four-heroine-r4/runtime.mjs';" in entry.read_text()
if not wired or not doc.exists():
 report["stages"].append({"name":"default-entry","status":"BLOCKED","reason":"Canonical runtime not wired or actual dist not built."});save()
elif ok and repo_ok:
 report["builtEntryHash"]=hashlib.sha256(doc.read_bytes()).hexdigest()
 port=os.environ.get("R4_QA_PORT","8765")
 with (Q/"http-server.log").open("w") as log:
  server=subprocess.Popen([sys.executable,"-m","http.server",port,"--bind","127.0.0.1","--directory",str(GAME/"dist")],stdout=log,stderr=subprocess.STDOUT)
  try:
   env=dict(os.environ,R4_MODE="native",R4_REAL_URL="http://127.0.0.1:"+port+"/index.html")
   for _ in range(30):
    try:
     with urllib.request.urlopen(env["R4_REAL_URL"]) as r:
      assert hashlib.sha256(r.read()).hexdigest()==report["builtEntryHash"]
     break
    except OSError:time.sleep(.2)
   else:raise RuntimeError("Current build server did not start")
   ui_ok=stage("native-v45-ui",[sys.executable,"tools/test-v45-browser.py"],env=env)
   reader_ok=stage("native-v47-reader-and-save-migration",[sys.executable,"tools/test-v46-reader.py"],env=env)
   first_ok=stage("native-v48-readable-first-choice",[sys.executable,"tools/test-v48-first-choice.py"],env=env)
   if ui_ok and reader_ok and first_ok:
    stage("native-v45-full-routes",[sys.executable,"tools/test-v45-route.py"],env=env,timeout=1800)
   stage("fixture-schedule-coverage",[sys.executable,"tools/test-v45-schedule.py"])
  except Exception as e:
   report["stages"].append({"name":"actual-entry-serving","status":"BLOCKED","reason":str(e)})
  finally:
   server.terminate();server.wait(timeout=10)
report["sourceHashes"]={p:hashlib.sha256((M/p).read_bytes()).hexdigest() for p in ["data/STORY.json","tools/engine.mjs","tools/preview-ui.js","index.html","runtime.mjs"]}
report["engineeringAcceptance"]="PASS" if report["stages"] and all(s["status"]=="PASS" for s in report["stages"]) else "NOT_PASSED"
report["releaseAcceptance"]="NOT_APPROVED: physical devices, blind adult play, final art and platform/IAA remain separate."
save()
if report["engineeringAcceptance"]!="PASS":raise SystemExit(1)

import {describe,it,expect} from 'vitest';
import {existsSync} from 'node:fs';
async function api(){expect(existsSync(new URL('../src/romance-view.ts',import.meta.url)),'romance renderer must exist').toBe(true);return import('../src/romance-view.js');}
const scene={id:'q1',title:'先赴谁的约',time:'周五 18:00',paragraphs:['沈知夏：“第一杯给你留着。”','陆闻溪：“你能过来吗？”'],choices:[{id:'q1-z',label:'先去半拍'}]};
const state={phase:'decision' as const,loop:1,choices:[],endingIds:[],history:[]};
describe('romance rendering contract',()=>{
  it('renders source paragraphs and stable choice IDs without rural runtime chrome',async()=>{
    const {renderStory}=await api();const html=renderStory(scene,state,null,false);
    expect(html).toContain('攻略美少女');expect(html).toContain('data-choice="q1-z"');
    for(const text of scene.paragraphs)expect(html).toContain(text);
    expect(html).not.toMatch(/村口向南|家底|1978|家况签/);
  });
  it('shows actual save failures and recovery controls without saying saved',async()=>{
    const {renderStory}=await api();const html=renderStory(scene,state,{code:'write-failed',message:'保存失败，上一份记录仍在'},false);
    expect(html).toContain('data-save-notice');expect(html).toContain('保存失败');expect(html).not.toContain('已自动保存');
    expect(html).toContain('data-action="retry-save"');
    expect(html).toContain('data-action="temporary-session"');
  });
  it('escapes dialogue and option text so imported history cannot inject markup',async()=>{
    const {renderStory}=await api();const html=renderStory({...scene,paragraphs:['<img src=x onerror=alert(1)>'],choices:[{id:'safe',label:'<script>bad</script>'}]},state,null,false);
    expect(html).not.toContain('<img src=x');expect(html).toContain('&lt;img');expect(html).not.toContain('<script>bad');
  });
  it('never auto-selects a choice or offers skipping unread scenes',async()=>{
    const {renderStory}=await api();expect(renderStory(scene,state,null,true)).not.toContain('data-action="skip-read"');
    expect(renderStory({...scene,choices:[]},{...state,phase:'response'},null,false)).not.toContain('data-action="skip-read"');
    expect(renderStory({...scene,choices:[]},{...state,phase:'response'},null,true)).toContain('data-action="skip-read"');
  });
  it('ends with collection and optional rewind rather than unfinished chapter promises',async()=>{
    const {renderStory}=await api();const html=renderStory({...scene,id:'ending-friendship',endingId:'friendship',choices:[]},{...state,phase:'ending'},null,false);
    expect(html).toContain('data-ending-id="friendship"');expect(html).toContain('data-action="restart"');expect(html).toContain('收好照片');expect(html).not.toContain('下一章即将');
  });
});

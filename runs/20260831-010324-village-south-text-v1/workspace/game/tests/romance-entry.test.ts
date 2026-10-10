import {readFileSync} from 'node:fs';
import {describe,it,expect} from 'vitest';
describe('default runtime wiring (structural gate; browser gate separate)',()=>{
  it('loads the romance engine and source prose on the default entry',()=>{
    const source=readFileSync(new URL('../src/main.ts',import.meta.url),'utf8');
    expect(source).toContain("from './romance-engine.js'");
    expect(source).toContain("from './romance-content.js'");
    expect(source).not.toMatch(/from ['"].*chapter-data|from ['"].*\/game\.js|__NARRATIVE_TEST__|__GAME_TEST__/);
  });
  it('publishes the current title and removes rural CSS-generated text',()=>{
    expect(readFileSync(new URL('../index.html',import.meta.url),'utf8')).toContain('攻略美少女');
    expect(readFileSync(new URL('../src/style.css',import.meta.url),'utf8')).not.toContain('东坪县个人卷宗');
  });
});

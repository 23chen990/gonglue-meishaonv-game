import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';

async function api() {
  expect(existsSync(new URL('../src/romance-input.ts',import.meta.url)), 'romance gesture guard must exist').toBe(true);
  return import('../src/romance-input.js');
}
describe('romance natural input boundary',()=>{
  it('accepts a click only for the decision where the pointer started',async()=>{
    const {InputGuard}=await api();const guard=new InputGuard();
    guard.pointerDown(10,20,'q1:0');
    expect(guard.acceptClick(1,'q1:0')).toBe(true);
    expect(guard.acceptClick(2,'q1:1')).toBe(false);
    guard.pointerDown(10,20,'q1:0');
    expect(guard.acceptClick(1,'q1:1')).toBe(false);
  });
  it('a scroll release over a choice never submits it',async()=>{
    const {InputGuard}=await api();const guard=new InputGuard();
    guard.pointerDown(10,20,'q1');guard.pointerMove(10,80);
    expect(guard.acceptClick(1,'q1')).toBe(false);
    guard.pointerDown(10,20,'q1');
    expect(guard.acceptClick(1,'q1')).toBe(true);
  });
  it('held activation keys do not carry into a new scene',async()=>{
    const {InputGuard}=await api();const guard=new InputGuard();
    expect(guard.keyDown('Enter',false)).toBe(true);
    expect(guard.keyDown('Enter',true)).toBe(false);
    expect(guard.keyDown('Enter',false)).toBe(false);
    guard.keyUp('Enter');expect(guard.keyDown('Enter',false)).toBe(true);
    expect(guard.keyDown('Tab',true)).toBe(true);
  });
  it('focus/visibility loss clears an interrupted input sequence',async()=>{
    const {InputGuard}=await api();const guard=new InputGuard();
    guard.keyDown(' ',false);guard.pointerDown(0,0,'q1');guard.pointerMove(0,90);guard.cancel();
    expect(guard.keyDown(' ',false)).toBe(true);expect(guard.acceptClick(0,'q1')).toBe(true);
  });
});

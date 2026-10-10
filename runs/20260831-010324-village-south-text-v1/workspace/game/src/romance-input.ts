/** Gesture lifetime is separate from a decision's lifetime; no timing heuristics. */
export class InputGuard {
  private pointer: {x:number;y:number;token:string;dragged:boolean} | null = null;
  private held = new Set<string>();
  pointerDown(x:number,y:number,token:string):void { this.pointer={x,y,token,dragged:false}; }
  pointerMove(x:number,y:number):void {
    if(this.pointer && Math.hypot(x-this.pointer.x,y-this.pointer.y)>8) this.pointer.dragged=true;
  }
  acceptClick(detail:number,token:string):boolean {
    const pointer=this.pointer; this.pointer=null;
    return detail<=1 && (detail===0 || !!pointer && !pointer.dragged && pointer.token===token);
  }
  keyDown(key:string,repeat:boolean):boolean {
    if(key!=='Enter' && key!==' ') return true;
    if(repeat || this.held.has(key)) return false;
    this.held.add(key);return true;
  }
  keyUp(key:string):void {this.held.delete(key);}
  cancel():void {this.pointer=null;this.held.clear();}
}

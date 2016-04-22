export class CycleNode {
  public cycleNum: string;


	//stat, icode, valE, valM, dstE, dstM
	public w: string[] = ["", "", "", "", "", ""];
	
	//stat, icode, Cnd, valE, valA, dstE, dstM
	public m: string[] = ["", "", "", "", "", "", ""];
	
	//stat, icode, ifun, valC, valA, valB, dstE, dstM, srcA, srcB
	public e: string[] = ["", "", "", "", "", "", "", "", "", ""];
	
	//stat, icode, ifun, rA, rB, valC, valP
	public d: string[] = ["", "", "", "", "", "", ""];
	
	//predPC
	public f: string;
	
	public next: CycleNode;
  public previous: CycleNode;

  public getf() {
  return this.f;
  }
 
  public setf(f:string) {
  this.f = f;
  }
  
  constructor(cycleNum: string) {this.cycleNum = cycleNum;}
}


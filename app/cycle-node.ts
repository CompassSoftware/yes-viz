export class CycleNode {
	public cycleNum: string;
	
	//stat, icode, valE, valM, dstE, dstM
	public w: string[] = [];
	
	//stat, icode, Cnd, valE, valA, dstE, dstM
	public m: string[] = [];
	
	//stat, icode, ifun, valC, valA, valB, dstE, dstM, srcA, srcB
	public e: string[] = [];
	
	//stat, icode, ifun, rA, rB, valC, valP
	public d: string[] = [];
	
	//predPC
	public f: string;
	
	//Flags
	public zf: string;
	public sf: string;
	public of: string;
	
	//rax, rcx, rdx, rbx, rsp, rbp, rsi, rdi, r8, r9, r10, r11, r12, r13, r14
	public genRegs: string[];
	
	public mem: string[][];
	
	//Needed for prev and next buttons
	public next: CycleNode = null;
	public previous: CycleNode = null;
	
	/**
	 * constructor for the cycle node.
	 * 
	 * @param cycleNum:String - the number of the cycle
	 */
	constructor(cycleNum: string) {
		this.cycleNum = cycleNum;
		this.genRegs = [];
		this.mem = [];
	}
}


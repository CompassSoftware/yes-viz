import {Injectable} from "angular2/core";
import {CycleNode} from "./cycle-node";

@Injectable()
export class ParserService {
	private cn: CycleNode;

	parse(data: string): CycleNode {
		var arr: string[] = data.split("\n");

		this.createCycleNode(arr[0]);
		this.fillF(arr[1]);
		this.fillD(arr[2]);
		this.fillE(arr[3], arr[4]);
		this.fillM(arr[5]);
		this.fillW(arr[6]);
		this.fillFlags(arr[8]);
		this.fillGenRegs(arr[9], arr[10], arr[11], arr[12]);
		this.fillMem(arr);
		
		return this.cn;
	}
	
	private createCycleNode(data: string) {
		this.cn = new CycleNode(data.substring(0, data.length-1));
	}
	
	private fillF(data: string) {
		this.cn.f = data.substr(11, 3);
	}
	
	private fillD(data: string) {
		var d = this.cn.d;
		d[0] = data.charAt(9);
		d[1] = data.charAt(18);
		d[2] = data.charAt(26);
		d[3] = data.charAt(32);
		d[4] = data.charAt(38);
		d[5] = data.substr(46, 16);
		d[6] = data.substr(69, 3);
	}
	
	private fillE(data1: string, data2: string) {
		var e = this.cn.e;
		e[0] = data1.charAt(9);
		e[1] = data1.charAt(18);
		e[2] = data1.charAt(26);
		e[3] = data1.substr(34, 16);
		e[4] = data1.substr(57, 16);
		e[5] = data2.substr(9, 16);
		e[6] = data2.charAt(32);
		e[7] = data2.charAt(40);
		e[8] = data2.charAt(48);
		e[9] = data2.charAt(56);
	}
	
	private fillM(data: string) {
		var m = this.cn.m;
		m[0] = data.charAt(9);
		m[1] = data.charAt(18);
		m[2] = data.charAt(25);
		m[3] = data.substr(33, 16);
		m[4] = data.substr(56, 16);
		m[5] = data.charAt(79);
		m[6] = data.charAt(87);
	}
	
	private fillW(data: string) {
		var w = this.cn.w;
		w[0] = data.charAt(9);
		w[1] = data.charAt(18);
		w[2] = data.substr(26, 16);
		w[3] = data.substr(49, 16);
		w[4] = data.charAt(72);
		w[5] = data.charAt(80);
	}
	
	private fillFlags(data: string) {
		this.cn.zf = data.charAt(4);
		this.cn.sf = data.charAt(10);
		this.cn.of = data.charAt(16);
	}
	
	private fillGenRegs(data1: string, data2: string, data3: string, data4: string) {
		var regs = this.cn.genRegs;
		regs[0] = data1.substr(6, 16);
		regs[1] = data1.substr(29, 16);
		regs[2] = data1.substr(52, 16);
		regs[3] = data1.substr(75, 16);
		regs[4] = data2.substr(6, 16);
		regs[5] = data2.substr(29, 16);
		regs[6] = data2.substr(52, 16);
		regs[7] = data2.substr(75, 16);
		regs[8] = data3.substr(6, 16);
		regs[9] = data3.substr(29, 16);
		regs[10] = data3.substr(52, 16);
		regs[11] = data3.substr(75, 16);
		regs[12] = data4.substr(6, 16);
		regs[13] = data4.substr(29, 16);
		regs[14] = data4.substr(52, 16);
	}
	
	private fillMem(data: string[]) {
		var mem = this.cn.mem;
		var index = 0;
		for(var i = 14; i < data.length; i++) {
			mem[index] = data[i].split(" ");
			index++;
		}
		mem.pop();
	}
}
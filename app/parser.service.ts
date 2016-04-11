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
}
import {Injectable} from "angular2/core";
import {CycleNode} from "./cycle-node";

@Injectable()
export class ParserService {
	parse(data: string): CycleNode {
		var arr: string[] = data.split("\n");
		var cn: CycleNode;

		this.createCycleNode(arr[0]);
	}
	
	private createCycleNode(data: string) {
		this.cn = new CycleNode(data.substr(0, data.length-1));
		console.log(this.cn.cycleNum);
	}
}
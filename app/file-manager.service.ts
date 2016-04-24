import {Injectable} from "angular2/core";

@Injectable()
export class FileManagerService {
	private data: string[] = [];
	private index = 0;
	public callback: Function;
	
	readFile(file: File) {
		var fr = new FileReader();
		var self = this;
		var fn = this.getFileData;
		fr.onload = function(e) {
			fn(fr.result, self);
		}
		fr.readAsText(file);
	}
	
	getFileData(data: string, self: FileManagerService) {
		self.data = data.split("\nAt end of cycle ");
		self.index = 1;
		if(self.callback != null) self.callback();
	}
	
	getNextClock() {
		return this.data[this.index++];
	}
	
	hasNextClock() {
		return this.index < this.data.length ? true : false;
	}
}
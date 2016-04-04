import {Injectable} from "angular2/core";

@Injectable()
export class FileManagerService {
	private data: string;
	
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
		self.data = data;
	}
	
	getNextClock() {

	}
	
	hasNextClock() {
	
	}
}
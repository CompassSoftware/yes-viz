/*
 * file-manager.service.ts
 *
 * An injectable angular service that reads data in from a dump file, and
 * returns it divided into individual clock cycles. A callback function is also
 * supported, to act on the data after it finishes reading.
 */
import {Injectable} from "angular2/core";

@Injectable()
export class FileManagerService {
	private data: string[] = [];
	private index = 0;
	public callback: Function;
	
	/**
	 * readFile
	 * 
	 * Creates a new FileReader to read from the inputted file.
	 * 
	 * @param file: File - the file to be read.
	 */
	readFile(file: File) {
		var fr = new FileReader();
		var self = this;
		var fn = this.getFileData;
		fr.onload = function(e) {
			fn(fr.result, self);
		}
		fr.readAsText(file);
	}
	
	/**
	 * getFileData
	 * 
	 * Helper function used by readFile, to fill the data variable
	 * after the file finishes reading in.
	 * 
	 * @param data: String
	 * @param self: FileMangerService
	 */
	getFileData(data: string, self: FileManagerService) {
		self.data = data.split("\nAt end of cycle ");
		self.index = 1;
		if(self.callback != null) self.callback();
	}
	
	/**
	 * getNextClock
	 * 
	 * This method will get the data for the next clock and increase index by 1.
	 */
	getNextClock() {
		return this.data[this.index++];
	}
	
	/**
	 * hasNextClock
	 * 
	 * This methods returns if there is a next index in data.
	 */
	hasNextClock() {
		return this.index < this.data.length ? true : false;
	}
}

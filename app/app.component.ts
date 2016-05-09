import {Component} from "angular2/core";
import {CycleNode} from "./cycle-node";
import {DoublyLinkedList} from "./DoublyLInkedList";
import {FileManagerService} from "./file-manager.service";
import {ParserService} from "./parser.service";

enum Views {
	cyclenum,
	wstat, wicode, wvale, wvalm, wdste, wdstm,
	mstat, micode, mcnd, mvale, mvala, mdste, mdstm,
	estat, eicode, eifun, evalc, evala, evalb, edste, edstm, esrca, esrcb,
	dstat, dicode, difun, dra, drb, dvalc, dvalp, 
	fpredpc,
	zflag, sflag, oflag
}

@Component({
	selector: "my-app",
	templateUrl: "app/app.component.html",
	styleUrls: ["app/app.component.css"],
	providers: [FileManagerService, ParserService]
})
export class AppComponent {
	public cn: CycleNode;
	public userList: DoublyLinkedList;
	public correctList: DoublyLinkedList;
	public display: DoublyLinkedList;
	public index: number;
	public userLength: number;
	public correctLength: number;
	public isRed: boolean[];
	public memRed: boolean[][];
    public viewName: string;

	public views = Views;

	public helpText =
`YES Visual Simulator

Welcome to the YES Visual Simulator.

To Get Started, upload your dump file along with the correct dump file.


Available commands upon uploading:


Browse: Button to upload your dump files.


Run: Will continue to cycle through your dump file and the correct dump file until a difference is found. Different values will be displayed as RED values.


Next: Continues to the next cycle and checks for dump differences. If one dump file runs out of cycles, the other will continue.


Change Dump File: Switch the currently displayed cycle between your dump file and the correct one.


Previous: Backtracks to the last cycle.`;
	
	constructor(private _fileManagerService: FileManagerService,
				private _parserService: ParserService) {
		this.isRed = [];
		this.memRed = [];
    }
	
	userUploadListener($event) {
		if($event.target.files.length != 0) {
			this._fileManagerService.callback = () : void => {
				var data: string;
				this.userList = new DoublyLinkedList();
				while(this._fileManagerService.hasNextClock()) {
					data = this._fileManagerService.getNextClock();
					this.userList.insert(this._parserService.parse(data));
				}
				this.resetLists();
				this.userLength = this.userList.getLength()-1;
			};
			this._fileManagerService.readFile($event.target.files[0]);
		}
	}
	
	correctUploadListener($event) {
		if($event.target.files.length != 0) {
			this._fileManagerService.callback = () : void => {
				var data: string;
				this.correctList = new DoublyLinkedList();
				while(this._fileManagerService.hasNextClock()) {
					data = this._fileManagerService.getNextClock();
					this.correctList.insert(this._parserService.parse(data));
				}
				this.resetLists();
				this.correctLength = this.correctList.getLength()-1;
			};
			this._fileManagerService.readFile($event.target.files[0]);
		}
	}

	nextListener() {
		var gotNext = false;
		if(this.userList != null && this.index < this.userLength) {
			this.userList.next();
			gotNext = true;
		}
		if(this.correctList != null && this.index < this.correctLength) {
			this.correctList.next();
			gotNext = true;
		}
		if(gotNext) {
			this.index++;
			this.updateCN();
			if(this.userList != null && this.correctList != null) this.compare();
		}
	}
	
	prevListener() {
		if(this.index > 0) {
			var gotPrev = false;
			if(this.userList != null && this.index <= this.userLength) {
				this.userList.previous();
				gotPrev = true;
			}
			if(this.correctList != null && this.index <= this.correctLength) {
				this.correctList.previous();
				gotPrev = true;
			}
			if(gotPrev) {
				this.index--;
				this.updateCN();
				if(this.userList != null && this.correctList != null) this.compare();
			}
		}
	}
	
	resetLists() {
		if(this.correctList != null) {
			this.correctList.reset();
			this.display = this.correctList;
			this.viewName = "Correct File";
		}
		if(this.userList != null) {
			this.userList.reset();
			this.display = this.userList;
			this.viewName = "Your File";
		}
		this.updateCN();
		this.index = 0;
		if(this.userList != null && this.correctList != null) this.compare();
	}
	
	runListener() {
		if(this.userList != null && this.correctList != null) {
			do {
				if(!this.compare()) break;
				else if(this.userList.hasNext() || this.correctList.hasNext()) {
					this.userList.next();
					this.correctList.next();
					this.index++;
					this.clearReds();
					this.fixMemRedSize();
				} else break;
			} while(true);
			this.cn = this.display.getCurrent();
		}
	}
	
	changeListener() {
		if(this.display == this.userList && this.correctList != null) {
			this.display = this.correctList;
			this.viewName = "Correct File";
		}
		else if(this.display == this.correctList && this.userList != null) {
			this.display = this.userList;
			this.viewName = "Your File";
		}
		this.updateCN();
		if(this.userList != null && this.correctList != null) this.compare();
	}
	
	helpListener() {
		alert(this.helpText);
	}
	
	private compare(): boolean {
		var cn1 = this.userList.getCurrent();
		var cn2 = this.correctList.getCurrent();
		var isDifferent = false;
		
		if(cn1.cycleNum != cn2.cycleNum) {
			this.isRed[this.views.cyclenum] = true;
			return false;
		}
		
		if(cn1.w[0] != cn2.w[0]) {
			this.isRed[this.views.wstat] = true;
			isDifferent = true;
		}
		if(cn1.w[1] != cn2.w[1]) {
			this.isRed[this.views.wicode] = true;
			isDifferent = true;
		}
		if(cn1.w[2] != cn2.w[2]) {
			this.isRed[this.views.wvale] = true;
			isDifferent = true;
		}
		if(cn1.w[3] != cn2.w[3]) {
			this.isRed[this.views.wvalm] = true;
			isDifferent = true;
		}
		if(cn1.w[4] != cn2.w[4]) {
			this.isRed[this.views.wdste] = true;
			isDifferent = true;
		}
		if(cn1.w[5] != cn2.w[5]) {
			this.isRed[this.views.wdstm] = true;
			isDifferent = true;
		}
		
		if(cn1.m[0] != cn2.m[0]) {
			this.isRed[this.views.mstat] = true;
			isDifferent = true;
		}
		if(cn1.m[1] != cn2.m[1]) {
			this.isRed[this.views.micode] = true;
			isDifferent = true;
		}
		if(cn1.m[2] != cn2.m[2]) {
			this.isRed[this.views.mcnd] = true;
			isDifferent = true;
		}
		if(cn1.m[3] != cn2.m[3]) {
			this.isRed[this.views.mvale] = true;
			isDifferent = true;
		}
		if(cn1.m[4] != cn2.m[4]) {
			this.isRed[this.views.mvala] = true;
			isDifferent = true;
		}
		if(cn1.m[5] != cn2.m[5]) {
			this.isRed[this.views.mdste] = true;
			isDifferent = true;
		}
		if(cn1.m[6] != cn2.m[6]) {
			this.isRed[this.views.mdstm] = true;
			isDifferent = true;
		}
		
		if(cn1.e[0] != cn2.e[0]) {
			this.isRed[this.views.estat] = true;
			isDifferent = true;
		}
		if(cn1.e[1] != cn2.e[1]) {
			this.isRed[this.views.eicode] = true;
			isDifferent = true;
		}
		if(cn1.e[2] != cn2.e[2]) {
			this.isRed[this.views.eifun] = true;
			isDifferent = true;
		}
		if(cn1.e[3] != cn2.e[3]) {
			this.isRed[this.views.evalc] = true;
			isDifferent = true;
		}
		if(cn1.e[4] != cn2.e[4]) {
			this.isRed[this.views.evala] = true;
			isDifferent = true;
		}
		if(cn1.e[5] != cn2.e[5]) {
			this.isRed[this.views.evalb] = true;
			isDifferent = true;
		}
		if(cn1.e[6] != cn2.e[6]) {
			this.isRed[this.views.edste] = true;
			isDifferent = true;
		}
		if(cn1.e[7] != cn2.e[7]) {
			this.isRed[this.views.edstm] = true;
			isDifferent = true;
		}
		if(cn1.e[8] != cn2.e[8]) {
			this.isRed[this.views.esrca] = true;
			isDifferent = true;
		}
		if(cn1.e[9] != cn2.e[9]) {
			this.isRed[this.views.esrcb] = true;
			isDifferent = true;
		}
		
		if(cn1.d[0] != cn2.d[0]) {
			this.isRed[this.views.dstat] = true;
			isDifferent = true;
		}
		if(cn1.d[1] != cn2.d[1]) {
			this.isRed[this.views.dicode] = true;
			isDifferent = true;
		}
		if(cn1.d[2] != cn2.d[2]) {
			this.isRed[this.views.difun] = true;
			isDifferent = true;
		}
		if(cn1.d[3] != cn2.d[3]) {
			this.isRed[this.views.dra] = true;
			isDifferent = true;
		}
		if(cn1.d[4] != cn2.d[4]) {
			this.isRed[this.views.drb] = true;
			isDifferent = true;
		}
		if(cn1.d[5] != cn2.d[5]) {
			this.isRed[this.views.dvalc] = true;
			isDifferent = true;
		}
		if(cn1.d[6] != cn2.d[6]) {
			this.isRed[this.views.dvalp] = true;
			isDifferent = true;
		}
		
		if(cn1.f != cn2.f) {
			this.isRed[this.views.fpredpc] = true;
			isDifferent = true;
		}
		
		if(cn1.zf != cn2.zf) {
			this.isRed[this.views.zflag] = true;
			isDifferent = true;
		}
		if(cn1.sf != cn2.sf) {
			this.isRed[this.views.sflag] = true;
			isDifferent = true;
		}
		if(cn1.of != cn2.of) {
			this.isRed[this.views.oflag] = true;
			isDifferent = true;
		}

		var i: number;
		for(i = 0; i < Math.min(cn1.mem.length, cn2.mem.length); i++) {
			if(cn1.mem[i][0] != cn2.mem[i][0]) {
				this.memRed[i][0] = true;
				isDifferent = true;
			}
			if(cn1.mem[i][1] != cn2.mem[i][1]) {
				this.memRed[i][1] = true;
				isDifferent = true;
			}
			if(cn1.mem[i][2] != cn2.mem[i][2]) {
				this.memRed[i][2] = true;
				isDifferent = true;
			}
			if(cn1.mem[i][3] != cn2.mem[i][3]) {
				this.memRed[i][3] = true;
				isDifferent = true;
			}
			if(cn1.mem[i][4] != cn2.mem[i][4]) {
				this.memRed[i][4] = true;
				isDifferent = true;
			}
		}
		if(cn1.mem.length != cn2.mem.length) {
			isDifferent = true;
			var n = this.display.getCurrent().mem.length;
			for(i; i < n; i++) this.memRed[i][0] = true;
		}
		
		return !isDifferent;
	}
	
	private clearReds() {
		this.isRed = [];
		this.memRed = [];
	}
	
	private updateCN() {
		this.clearReds();
		this.fixMemRedSize();
		this.cn = this.display.getCurrent();
	}

	private fixMemRedSize() {
		var n = this.display.getCurrent().mem.length;
		for(var i = 0; i < n; i++) this.memRed[i] = [];
	}
}

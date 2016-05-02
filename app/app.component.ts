import {Component} from "angular2/core";
import {CycleNode} from "./cycle-node";
import {DoublyLinkedList} from "./DoublyLInkedList";
import {FileManagerService} from "./file-manager.service";
import {ParserService} from "./parser.service";

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
	
	constructor(private _fileManagerService: FileManagerService,
				private _parserService: ParserService) {
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
			this.cn = this.display.getCurrent();
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
				this.cn = this.display.getCurrent();
				if(this.userList != null && this.correctList != null) this.compare();
			}
		}
	}
	
	resetLists() {
		if(this.correctList != null) {
			this.correctList.reset();
			this.display = this.correctList;
		}
		if(this.userList != null) {
			this.userList.reset();
			this.display = this.userList;
		}
		this.cn = this.display.getCurrent();
		this.index = 0;
	}
	
	runListener() {
		if(this.userList != null && this.correctList != null) {
			do {
				if(!this.compare()) break;
				if(this.userList.hasNext() || this.correctList.hasNext()) {
					this.userList.next();
					this.correctList.next();
					this.index++;
				}
			} while(true);
			this.cn = this.display.getCurrent();
		}
	}
	
	changeListener() {
		if(this.display == this.userList && this.correctList != null)
			this.display = this.correctList;
		else if(this.display == this.correctList && this.userList != null)
			this.display = this.userList;
		this.cn = this.display.getCurrent();
	}
	
	
	
	public compare(): boolean {
		var cn1 = this.userList.getCurrent();
		var cn2 = this.correctList.getCurrent();
		if(cn1.cycleNum != cn2.cycleNum) return false;
		else return true;
	}
}

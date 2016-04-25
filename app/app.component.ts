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
  public linkedList: DoublyLinkedList;
  public correctList: DoublyLinkedList;
	
	constructor(private _fileManagerService: FileManagerService,
				private _parserService: ParserService) {
    }
	
	userUploadListener($event) {
		if($event.target.files.length != 0) {
			this._fileManagerService.callback = () : void => {
				var data: string;
				this.linkedList = new DoublyLinkedList();
				while(this._fileManagerService.hasNextClock()) {
					data = this._fileManagerService.getNextClock();
					this.linkedList.insert(this._parserService.parse(data));
				}
				this.resetLists();
				this.cn = this.linkedList.getCurrent();
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
			};
			this._fileManagerService.readFile($event.target.files[0]);
		}
	}

	nextListener() {
		if(this.linkedList != null)
			if(this.linkedList.next())
				this.cn = this.linkedList.getCurrent();
		if(this.correctList != null) this.correctList.next();
	}
	
	prevListener() {
		if(this.linkedList != null)
			if(this.linkedList.previous())
				this.cn = this.linkedList.getCurrent();
		if(this.correctList != null) this.correctList.previous();
	}
	
	runListener() {
		if(this.linkedList != null && this.correctList != null) {
			do {
				if(!this.compare()) return;
			} while(this.linkedList.next() && this.correctList.next());
			this.cn = this.linkedList.getCurrent();
		}
	}
	
	public resetLists() {
		if(this.linkedList != null) {
			this.linkedList.reset();
			this.cn = this.linkedList.getCurrent();
		}
		if(this.correctList != null) this.correctList.reset();
	}
	
	public compare(): boolean {
		//TODO: Compare the two currents, update view, return true if identical, false if different
		return true;
	}
}

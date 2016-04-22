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
	
	constructor(private _fileManagerService: FileManagerService,
  private _parserService: ParserService) {
   this.linkedList = new DoublyLinkedList();
   }
	
  changeListener($event) {
  var data: string;
		if($event.target.files.length != 0)
    this._fileManagerService.readFile($event.target.files[0]);
    while(this._fileManagerService.hasNextClock()) {
      data = this._fileManagerService.getNextClock();
      this.linkedList.insert(this._parserService.parse(data));
      }
      this.cn = this.linkedList.getCurrent();
  }

  nextListener() {
  this.linkedList.next();
  this.cn = this.linkedList.getCurrent();
  }
	
	prevListener() {
  this.linkedList.previous();
  this.cn = this.linkedList.getCurrent();
	}
}

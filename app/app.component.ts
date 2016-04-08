import {Component} from "angular2/core";
import {CycleNode} from "./cycle-node";
import {FileManagerService} from "./file-manager.service";

@Component({
	selector: "my-app",
	templateUrl: "app/app.component.html",
	styleUrls: ["app/app.component.css"],
	providers: [FileManagerService]
})
export class AppComponent {
	public cn = new CycleNode();
	
	constructor(private _fileManagerService: FileManagerService) {}
	
	changeListener($event) {
		this._fileManagerService.readFile($event.target.files[0]);
	}
	
	clickListener() {
		if(this._fileManagerService.hasNextClock()) {
			console.log(this._fileManagerService.getNextClock());
		}
	}
}
import {Component} from "angular2/core";
import {CycleNode} from "./cycle-node";
import {FileManagerService} from "./file-manager.service";
import {ParserService} from "./parser.service";

@Component({
	selector: "my-app",
	templateUrl: "app/app.component.html",
	styleUrls: ["app/app.component.css"],
	providers: [FileManagerService, ParserService]
})
export class AppComponent {
	public cn = new CycleNode();
	
	constructor(private _fileManagerService: FileManagerService,
				private _parserService: ParserService) {}
	
	changeListener($event) {
		this._fileManagerService.readFile($event.target.files[0]);
	}
	
	clickListener() {
		var data: string;
		if(this._fileManagerService.hasNextClock()) {
			data = this._fileManagerService.getNextClock();
			console.log(data);
			this._parserService.parse(data);
		}
	}
}
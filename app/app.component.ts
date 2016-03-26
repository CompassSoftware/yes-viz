import {Component} from "angular2/core";
import {RegisterNode} from "./register-node";

@Component({
	selector: "my-app",
	templateUrl: "app/app.component.html",
	styleUrls: ["app/app.component.css"]
})
export class AppComponent {
	public rn = new RegisterNode();
}
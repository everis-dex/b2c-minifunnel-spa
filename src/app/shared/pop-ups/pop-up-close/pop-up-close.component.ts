import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
@Component({
	selector: "app-pop-up-close",
	templateUrl: "./pop-up-close.component.html",
	styleUrls: ["./pop-up-close.component.scss"],
})
export class PopUpMainComponent implements OnInit {

	@Output() closeSelected = new EventEmitter<boolean>();
	@Input() disableClose: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	closePopUp(): any {
		this.closeSelected.emit(true);
	}
}

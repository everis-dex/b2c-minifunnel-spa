import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatRadioButton } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, MatRadioButton, MatIcon]
})

export class RadiobuttonComponent {

  @Output() dataEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Input() radiobuttonId: string = '';  
  @Input() radiobuttonText: string = '';
  
  @Input() radiobuttonIconRoute: string = '';
  
  constructor( ) { }

  // sendData(event: any) {
  //   this.dataEmitter.emit(event.target.value);
  // }
}
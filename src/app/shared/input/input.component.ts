import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, CommonModule, ReactiveFormsModule]
})

export class InputComponent implements OnInit {

  @Output() dataEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Input() inputId: string = '';
  @Input() inputData: string = '';
  @Input() inputType: string = 'default'; // default or empty
  @Input() inputRequired: boolean = false;

  @Input() inputIcon: boolean = false;
  @Input() inputIconName: string = '';
  
  @Input() labelText: string = '';

  inputName: string = '';
  
  constructor( ) { }

  ngOnInit(): void {
    this.inputName = this.inputId;
  }

  sendData(event: any) {
    this.dataEmitter.emit(event.target.value);
  }
}

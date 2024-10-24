import { Component, Input, Output, EventEmitter } from '@angular/core';
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

export class InputComponent {

  @Output() dataEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Input() inputId: string = '';
  @Input() inputData: string = '';
  @Input() inputType: string = 'default'; // default or empty
  @Input() inputRequired: boolean = false;

  @Input() inputIcon: boolean = false;
  @Input() inputIconRoute: string = '';
  
  @Input() labelText: string = '';
  
  constructor( ) { }

  sendData(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dataEmitter.emit(inputElement.value);
  }
}

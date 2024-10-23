import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ MatSelectModule, NgFor, NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {

  @Input() selectId: string = '';
  @Input() selectOptions: { value: string, label: string }[] = [];

  @Output() selectedOption: EventEmitter<string> = new EventEmitter<string>();

  @Input() labelText: string = '';

  optionSelected: string = "";

  constructor() { }

  selectOption(selectedValue: string) {
    this.optionSelected = selectedValue;
    console.log(selectedValue);
    this.selectedOption.emit(this.optionSelected);
  }
}
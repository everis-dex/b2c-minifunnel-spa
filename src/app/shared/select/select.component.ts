import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ MatSelectModule, NgFor, NgIf, CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {

  @Input() selectId: string = '';
  // @Input() selectType = 'primary'; // primary or secondary
  // @Input() selectOptions: string[] = [];
  @Input() selectOptions: { value: string, label: string }[] = [];

  @Output() selectedOption: EventEmitter<string> = new EventEmitter<string>();

  @Input() labelText: string = '';

  optionSelected: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  // sendData(event: any) {
  //   this.selectedOption.emit(event.target.value);
  // }

  selectOption(selectedValue: string) {
    this.optionSelected = selectedValue;
    console.log(selectedValue); // Para verificar el valor seleccionado
    this.selectedOption.emit(this.optionSelected); // Emitir el valor seleccionado
  }
}
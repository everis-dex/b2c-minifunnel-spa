import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule, NgFor, NgIf, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent implements OnInit {

  @Input() checkboxId: string = '';
  @Input() checkboxText: string = '';

  @Output() checkboxChecked= new EventEmitter<boolean>();

  isChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isChecked = false;
  }

  onCheckboxChange(completed: boolean) {
    if (completed) {
      this.isChecked = true;
      this.checkboxChecked.emit(this.isChecked);
    } else {
      this.isChecked = false;
      this.checkboxChecked.emit(this.isChecked);
    }
  }
}
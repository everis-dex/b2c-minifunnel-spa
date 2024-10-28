import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {

  @Input() buttonId: string = '';
  @Input() buttonType = 'primary'; // primary or secondary
  @Input() buttonText: string = '';
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  @Input() buttonIconPhone: boolean = false;
  @Input() buttonIconSend: boolean = false;

  constructor() { }

  onButtonClick(): void {
    this.buttonClicked.emit();
  }
}

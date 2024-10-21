import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
// import { ParamsURLService } from 'src/app/services/params-url.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

  @Input() buttonId: string = '';
  @Input() buttonType = 'primary'; // primary or secondary
  @Input() buttonText: string = '';
  @Output() buttonClicked = new EventEmitter<boolean>();

  isClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isClicked = false;
  }

  buttonPressed(): void {
    this.isClicked = true;
    this.buttonClicked.emit(this.isClicked);
  }
}

import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, NgFor, NgIf, CommonModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  @Input() isPartner: boolean = false;
  // @Input() buttonIconSend: boolean = false;
  icon: boolean = true;

  constructor() { }

  
  nextClicked() {
    console.log('El botón fue pulsado');
	}

}

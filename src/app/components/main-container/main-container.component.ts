import { Component } from '@angular/core';
import { StepCardComponent } from '../../shared/step-card/step-card.component';
import { StepStatus } from '../../interfaces/interfaces';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [StepCardComponent, ButtonComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

  stepStatus = StepStatus;

  nextClicked() {
    console.log('El botón fue pulsado');
	}

}

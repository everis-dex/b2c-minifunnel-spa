import { Component } from '@angular/core';
import { StepCardComponent } from '../../shared/step-card/step-card.component';
import { StepStatus } from '../../interfaces/interfaces';
import { RadiobuttonComponent } from '../../shared/radiobutton/radiobutton.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [StepCardComponent, RadiobuttonComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

  stepStatus = StepStatus;

}

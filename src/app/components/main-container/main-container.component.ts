import { Component } from '@angular/core';
import { StepCardComponent } from '../../shared/step-card/step-card.component';
import { StepStatus } from '../../interfaces/interfaces';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [StepCardComponent, CheckboxComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

  stepStatus = StepStatus;

  checkbox(data: boolean) {
    console.log(data);
	}

}

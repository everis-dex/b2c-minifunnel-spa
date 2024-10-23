import { Component } from '@angular/core';
import { StepCardComponent } from '../../shared/step-card/step-card.component';
import { StepStatus } from '../../interfaces/interfaces';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [StepCardComponent, InputComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})

export class MainContainerComponent {

  stepStatus = StepStatus;
  isRequired: boolean = true; // Estado inicial
  icon: boolean = true; // Estado inicial

  receiveData(data: string) {
    console.log(data);
    
  }

}

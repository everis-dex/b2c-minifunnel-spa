import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input , OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StepStatus } from '../../interfaces/interfaces';

@Component({
  selector: 'app-step-card',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, CommonModule],
  templateUrl: './step-card.component.html',
  styleUrl: './step-card.component.scss'
})
export class StepCardComponent implements OnInit {


  @Input()
  public status: StepStatus = StepStatus.InProgress; 

  @Input()
  public readonly stepNumber: string = '1';

  @Input()
  public readonly title: string = '¿Qué energía necesitas?';

  stepStatus = StepStatus;

  ngOnInit(): void {
    console.log(this.stepNumber, '-',  this.title , '-', this.status);

  }

  editStep() {
    this.status = StepStatus.InProgress;
  }

}

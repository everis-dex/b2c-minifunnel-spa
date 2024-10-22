import { Component } from '@angular/core';
import { StepCardComponent } from '../../shared/step-card/step-card.component';
import { StepStatus } from '../../interfaces/interfaces';
import { SelectComponent } from '../../shared/select/select.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [StepCardComponent, SelectComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})

export class MainContainerComponent {

  stepStatus = StepStatus;

  selectedValue: string = ''; // Aquí guardarás el valor seleccionado

  options = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' }
  ];

  onSelectChange(value: string) {
    this.selectedValue = value; // Actualizar el valor seleccionado
    console.log('Valor seleccionado desde el componente hijo:', value);
  }

}

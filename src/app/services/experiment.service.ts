import { Injectable } from '@angular/core';
import { Experiment, Variant } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  experiments: Experiment[] = [];


  constructor() { }

// {
//   experiment: 'NombreExp',
//   [
//     {variant: 'A', min: 0, max: 40},
//     {variant: 'B', min: 40,},
//     {variant: 'Normal', chance: 30},
//   ]
// }

  createExperiment(e: Experiment): void {
    this.loadExperiments(e);
    if (!this.checkExperiment(e)) {
      e.selected = this.generateRandomVariant(e);
      localStorage.setItem('experiments', JSON.stringify([e]));
      this.loadExperiments(e);
    }
  }

  getExperimento(e: Experiment): Experiment {
    return this.experiments.filter((experiment: Experiment) => e.name === experiment.name)[0];
  }

  resetExperiment(): void {
    localStorage.removeItem('experiment');
  }

  loadExperiments(e: Experiment): any {
    this.experiments = JSON.parse(localStorage.getItem('experiments') ?? '[]');
    return this.experiments;
  }

  checkExperiment(experiment: Experiment): boolean {
    let r = false;
    this.experiments.forEach((e: Experiment) => {
      if (e.name === experiment.name){
        r = true;
      }
    });
    return r;
  }

  generateRandomVariant(experiment: Experiment): Variant{
    const n = Math.floor(Math.random() * 101);
    return experiment.variants.filter((v: Variant) => {
      return (n >= v.minChance && n < v.maxChance);
    })[0];
  }
}

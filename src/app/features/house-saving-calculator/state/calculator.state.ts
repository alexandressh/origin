import { Injectable } from '@angular/core';
import { State, Action, StateContext, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MonthlySaving } from '../interfaces';
import { CalculatorService } from '../services/calculator.service';
import { CalculateMonthlySaving } from './calculator.actions';

export class CalculatorStateModel {
    amount: string = "";
    totalMonths: number = 0;
}

const defaults = {
    amount: "",
    totalMonths: 0
};

@State<CalculatorStateModel>({
  name: 'calculator',
  ...defaults
})
@Injectable()
export class CalculatorState {

  constructor(
    private calculatorService: CalculatorService
    ) { }

  @Action(CalculateMonthlySaving)
  calculateMonthlySaving({ getState, setState }: StateContext<CalculatorStateModel>, { payload }: CalculateMonthlySaving) {
    const state = getState();
    const ret = this.calculatorService.calculateMonthlySaving(payload);
    
    return setState({ 
      ...state,
      ...ret
    });
  }
}

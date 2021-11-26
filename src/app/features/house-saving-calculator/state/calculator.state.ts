import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
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
    console.log(payload)
    
    return setState({ 
      ...state,
      ...ret
    });
  }
}

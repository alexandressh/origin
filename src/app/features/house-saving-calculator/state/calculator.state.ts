import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { CalculatorAction } from './calculator.actions';

export class CalculatorStateModel {
  public items: string[] = []
}

const defaults = {
  items: []
};

@State<CalculatorStateModel>({
  name: 'calculator',
  defaults
})
@Injectable()
export class CalculatorState {
  @Action(CalculatorAction)
  add({ getState, setState }: StateContext<CalculatorStateModel>, { payload }: CalculatorAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}

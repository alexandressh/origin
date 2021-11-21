export class CalculatorAction {
  static readonly type = '[Calculator] Add item';
  constructor(public payload: string) { }
}

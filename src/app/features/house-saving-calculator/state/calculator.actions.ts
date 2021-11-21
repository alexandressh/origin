import { HousePlanning } from "../interfaces";

export class CalculateMonthlySaving {
  static readonly type = '[Calculator] Calculate Monthly Saving';
  constructor(public payload: HousePlanning) { }
}

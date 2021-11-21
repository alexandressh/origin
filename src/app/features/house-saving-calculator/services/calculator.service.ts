import { Injectable } from '@angular/core';
import Decimal from 'decimal.js';
import { HousePlanning, MonthlySaving } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  calculateMonthlySaving(housePlanning: HousePlanning): MonthlySaving {
    const totalMonths = this.monthDiff(new Date(), new Date(housePlanning.endDateYear, housePlanning.endMonth))
    const division = Decimal.div(housePlanning.totalAmount, totalMonths);
    const amount = division.toDecimalPlaces(2, Decimal.ROUND_FLOOR).toString();

    return {
      amount,
      totalMonths
    }
  }

  private monthDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
   }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MonthlySaving } from '@features/house-saving-calculator/interfaces';
import { CalculateMonthlySaving } from '@features/house-saving-calculator/state/calculator.actions';
import { CalculatorState } from '@features/house-saving-calculator/state/calculator.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Select(CalculatorState) monthlySaving$!: Observable<any>;

  calculatorForm = new FormGroup({
    date: new FormControl(''),
    amount: new FormControl('1000')
  });

  constructor(
    private store: Store
  ) {
    this.monthlySaving$.subscribe(console.log)
   }

  ngOnInit(): void {
    this.watchForFormChanges();
  }

  private watchForFormChanges() {
    this.calculatorForm.valueChanges.subscribe(formValues => this.onDateOrAmountChange(formValues))
  }

  private onDateOrAmountChange(formValues: {amount: string, date: string}) {
    const payload = {
      totalAmount: formValues.amount,
      endDateYear: 2022,//formValues.date,
      endMonth: 12//formValues.date
    }
    this.store.dispatch([new CalculateMonthlySaving(payload)]);
  }

}

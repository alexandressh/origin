import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CalculateMonthlySaving } from '@features/house-saving-calculator/state/calculator.actions';
import { CalculatorState } from '@features/house-saving-calculator/state/calculator.state';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  @Select(CalculatorState) monthlySaving$!: Observable<any>;

  calculatorForm = new FormGroup({
    date: new FormControl(moment().add(1, 'month')),
    amount: new FormControl(1000),
  });

  constructor(private store: Store, private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {
    this.watchForFormChanges();
    this.calculatorForm.get('amount')?.setValue(1000);
  }

  get amount(): string {
    const amount = this.calculatorForm.get('amount')?.value;
    return this.decimalPipe.transform(amount, '1.0-2') || '';
  }

  get date(): moment.Moment {
    return this.calculatorForm.get('date')?.value;
  }

  get month(): string {
    return this.date.format('MMMM');
  }

  get year(): string {
    return this.date.format('YYYY');
  }

  private watchForFormChanges() {
    this.calculatorForm.valueChanges.subscribe((formValues) =>
      this.onDateOrAmountChange(formValues)
    );
  }

  private onDateOrAmountChange(formValues: {
    amount: string;
    date: Moment;
  }) {
    const payload = {
      totalAmount: formValues.amount,
      endDateYear: formValues.date.year(),
      endMonth: formValues.date.month(),
    };
    this.store.dispatch([new CalculateMonthlySaving(payload)]);
  }
}

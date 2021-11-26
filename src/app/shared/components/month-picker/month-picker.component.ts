import { Component, forwardRef, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthPickerComponent),
      multi: true
    }
  ]
})
export class MonthPickerComponent implements OnInit, ControlValueAccessor {
  date!: Moment;

  constructor() { }

  ngOnInit(): void {

  }

  get month(): string {
    return this.date.format('MMMM');
  }

  get year(): string {
    return this.date.format('YYYY')
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: Moment): void {
    this.date = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  addMonth(value: number): void {
    const newDate = this.date.clone().add(value, 'month');
    const isFuture = newDate.isAfter(moment(), 'month');

    if(isFuture) {
      this.date = newDate;
      this.onChange(newDate);
    }
  }

  updateMonth(e: KeyboardEvent) {
    const key = e.key;   

    if (key === 'ArrowRight') {
      this.addMonth(1);
      this.stopEvent(e);
    } else if (key === 'ArrowLeft') {
      this.addMonth(-1);
      this.stopEvent(e);
    }
  }

  private stopEvent(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

}

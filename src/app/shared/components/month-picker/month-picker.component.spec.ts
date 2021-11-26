import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

import { MonthPickerComponent } from './month-picker.component';

@Component({
  template: '<app-month-picker [formControl]="date"></app-month-picker>',
}) class MockComponent {
    public date = new FormControl(moment('1993-07-03'))
 }

describe('MonthPickerComponent', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  
  let compiledEl: HTMLElement;
  let increaseMonth: HTMLButtonElement | null;
  let decreaseMonth: HTMLButtonElement | null;
  let reachDateDiv: HTMLElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPickerComponent, MockComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;

    compiledEl = fixture.nativeElement;
  
    increaseMonth = compiledEl.querySelector('#increaseMonth');
    decreaseMonth = compiledEl.querySelector('#decreaseMonth');
    reachDateDiv = compiledEl.querySelector('#reachDate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render date correctly', () => {
    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')
  });

  it('should change date when button increase is pressed', () => {
    Date.now = () => new Date("1993-07-03T12:33:37.000Z").getTime();
    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')

    increaseMonth?.click();
    fixture.detectChanges();

    expect(compiledEl.querySelector('#month')?.textContent).toEqual('August');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')
  });

  it('should change date when button decrease is pressed', () => {
    Date.now = () => new Date("1992-05-03T12:33:37.000Z").getTime();
    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')

    decreaseMonth?.click();
    fixture.detectChanges();

    expect(compiledEl.querySelector('#month')?.textContent).toEqual('June');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')
  });

  it('should not change date when button decrease is pressed and new date is before "today"', () => {
    Date.now = () => new Date("1993-05-03T12:33:37.000Z").getTime();
    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')

    decreaseMonth?.click();
    fixture.detectChanges();
    decreaseMonth?.click();
    fixture.detectChanges();
    decreaseMonth?.click();
    fixture.detectChanges();

    expect(compiledEl.querySelector('#month')?.textContent).toEqual('June');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')
  });

  it('should increase months when right arrow is pressed', () => {
    Date.now = () => new Date("1993-05-03T12:33:37.000Z").getTime();
    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')

    reachDateDiv?.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowRight', key: 'ArrowRight'}));
    reachDateDiv?.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowRight', key: 'ArrowRight'}));
    reachDateDiv?.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowRight', key: 'ArrowRight'}));
    fixture.detectChanges();

    expect(compiledEl.querySelector('#month')?.textContent).toEqual('October');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')
  });

  it('should decrease months when left arrow is pressed', () => {
    Date.now = () => new Date("1991-05-03T12:33:37.000Z").getTime();
    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')

    Array.apply(null, Array(12)).forEach(() => {
      reachDateDiv?.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowLeft', key: 'ArrowLeft'}));
    })
    
    fixture.detectChanges();

    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1992')
  });

  it('should decrease months when left arrow is pressed but should not go before "next month"', () => {
    Date.now = () => new Date("1993-01-03T12:33:37.000Z").getTime();
    expect(compiledEl.querySelector('#month')?.textContent).toEqual('July');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')

    Array.apply(null, Array(12)).forEach(() => {
      reachDateDiv?.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowLeft', key: 'ArrowLeft'}));
    })
    
    fixture.detectChanges();

    expect(compiledEl.querySelector('#month')?.textContent).toEqual('February');
    expect(compiledEl.querySelector('#year')?.textContent).toEqual('1993')
  });
});

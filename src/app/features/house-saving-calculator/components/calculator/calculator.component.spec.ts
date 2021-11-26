import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorState, CalculatorStateModel } from '@features/house-saving-calculator/state/calculator.state';
import { NgxsModule, Store } from '@ngxs/store';
import { SharedModule } from '@shared/shared.module';
import * as moment from 'moment';

import { CalculatorComponent } from './calculator.component';

export const INITIAL_STATE = {
  amount: "1000",
  totalMonths: 100
} as CalculatorStateModel;

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiledEl: HTMLElement;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      imports: [
        NgxsModule.forRoot([CalculatorState]),
        SharedModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        DecimalPipe
      ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    compiledEl = fixture.nativeElement;
    
    component.calculatorForm.get('date')?.setValue(moment('2023-10-26'));
    component.calculatorForm.get('amount')?.setValue(1000);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render overview correctly', () => {
    store.reset({
      ...store.snapshot(),
      calculator: INITIAL_STATE
    });
    fixture.detectChanges();

    expect(compiledEl.querySelector('#overview')?.textContent).toEqual('You’re planning 100 monthly deposits to reach your $1,000 goal by October 2023.');
  });

  it('should update overview when amount changes', () => {
    const amountInput: HTMLInputElement = compiledEl.querySelector('input')!;

    amountInput.value = '2000';
    amountInput.dispatchEvent(new Event('input'));

    store.reset({
      ...store.snapshot(),
      calculator: INITIAL_STATE
    });
    fixture.detectChanges();

    expect(compiledEl.querySelector('#overview')?.textContent).toEqual('You’re planning 100 monthly deposits to reach your $2,000 goal by October 2023.');
    expect(compiledEl.querySelector('#monthlyAmount')?.textContent).toEqual('$1,000');
  });
});


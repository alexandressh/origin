import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { NgxsModule } from '@ngxs/store';
import { CalculatorState } from './state/calculator.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [
    CalculatorComponent
  ],
  exports: [
    CalculatorComponent
  ],
  providers: [DecimalPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxCurrencyModule,
    NgxsModule.forFeature([CalculatorState]),
  ]
})
export class HouseSavingCalculatorModule { }

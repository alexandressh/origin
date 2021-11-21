import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseSavingCalculatorPageComponent } from './house-saving-calculator-page/house-saving-calculator-page.component';
import { RouterModule } from '@angular/router';
import { HouseSavingCalculatorModule } from "@features/house-saving-calculator/house-saving-calculator.module"

@NgModule({
  declarations: [
    HouseSavingCalculatorPageComponent
  ],
  imports: [
    CommonModule,
    HouseSavingCalculatorModule,
    RouterModule.forChild([{
      path: '',
      component: HouseSavingCalculatorPageComponent
    }])
  ]
})
export class HouseSavingCalculatorPageModule { }

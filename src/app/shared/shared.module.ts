import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import { HeaderComponent } from './components/header/header.component';

const components = [
  MonthPickerComponent,
  HeaderComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

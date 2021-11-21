import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { ButtonComponent } from './shared/components/button/button.component';
import { CardComponent } from './shared/components/card/card.component';
import { InputComponent } from './shared/components/input/input.component';
import { MonthPickerComponent } from './shared/components/month-picker/month-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CardComponent,
    InputComponent,
    MonthPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

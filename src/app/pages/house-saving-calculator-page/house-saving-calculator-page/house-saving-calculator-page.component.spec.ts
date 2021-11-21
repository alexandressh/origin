import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSavingCalculatorPageComponent } from './house-saving-calculator-page.component';

describe('HouseSavingCalculatorPageComponent', () => {
  let component: HouseSavingCalculatorPageComponent;
  let fixture: ComponentFixture<HouseSavingCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSavingCalculatorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSavingCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

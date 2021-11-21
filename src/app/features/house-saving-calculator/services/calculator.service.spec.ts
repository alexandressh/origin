import { TestBed } from '@angular/core/testing';

import { HousePlanning } from '../interfaces';
import { CalculatorService } from './calculator.service';

fdescribe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 100 when amount is 1000 and totalMonths is 10', () => {
    const baseTime = new Date(2021, 0);
    jasmine.clock().mockDate(baseTime);

    const plan: HousePlanning = {
      totalAmount: "1000",
      endDateYear: 2021,
      endMonth: 10
    }

    const calculated = service.calculateMonthlySaving(plan);
    expect(calculated.totalMonths).toEqual(10);
    expect(calculated.amount).toEqual("100");
  });

  it('should return 100 when amount is 1200 and totalMonths is 12', () => {
    const baseTime = new Date(2021, 0);
    jasmine.clock().mockDate(baseTime);

    const plan: HousePlanning = {
      totalAmount: "1200",
      endDateYear: 2022,
      endMonth: 0
    }

    const calculated = service.calculateMonthlySaving(plan);
    expect(calculated.totalMonths).toEqual(12);
    expect(calculated.amount).toEqual("100");
  });

  it('should return 100 when amount is 100 and totalMonths is 1', () => {
    const baseTime = new Date(2021, 0);
    jasmine.clock().mockDate(baseTime);

    const plan: HousePlanning = {
      totalAmount: "100",
      endDateYear: 2021,
      endMonth: 1
    }

    const calculated = service.calculateMonthlySaving(plan);
    expect(calculated.amount).toEqual("100");
    expect(calculated.totalMonths).toEqual(1);
  });

  it('should return 33.33 when amount is 100 and totalMonths is 3', () => {
    const baseTime = new Date(2021, 0);
    jasmine.clock().mockDate(baseTime);

    const plan: HousePlanning = {
      totalAmount: "100",
      endDateYear: 2021,
      endMonth: 3
    }

    const calculated = service.calculateMonthlySaving(plan);
    expect(calculated.amount).toEqual("33.33");
    expect(calculated.totalMonths).toEqual(3);
  });
});

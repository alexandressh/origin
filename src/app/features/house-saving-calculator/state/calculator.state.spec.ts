import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CalculatorState } from './calculator.state';
import { CalculateMonthlySaving } from './calculator.actions';

describe('Calculator actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CalculatorState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    // store.dispatch(new CalculateMonthlySaving('item-1'));
    // store.select(state => state.calculator.items).subscribe((items: string[]) => {
    //   expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    // });
  });

});

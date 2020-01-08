import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusFilterComponent } from './bus-filter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

describe('BusFilterComponent', () => {
  let component: BusFilterComponent;
  let fixture: ComponentFixture<BusFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusFilterComponent],
      imports: [NgMultiSelectDropDownModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#setStationList() should change #stationList to the right values', () => {
    component.stationList = [
      {
        id: 1,
        countSlots: 2,
      },
      {
        id: 2,
        countSlots: 4,
      },
    ];
    component['setStationList']();

    expect(component.stationList).toEqual([
      {
        id: 1,
        countSlots: 2,
        aliasName: 'Station 1',
      },
      {
        id: 2,
        countSlots: 4,
        aliasName: 'Station 2',
      },
    ]);
  });
});

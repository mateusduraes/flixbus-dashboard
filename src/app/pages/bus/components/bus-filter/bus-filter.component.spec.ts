import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusFilterComponent } from './bus-filter.component';

describe('BusFilterComponent', () => {
  let component: BusFilterComponent;
  let fixture: ComponentFixture<BusFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

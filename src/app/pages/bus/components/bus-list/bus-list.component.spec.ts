import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusListComponent } from './bus-list.component';
import { BusType } from '@models/bus';

describe('BusListComponent', () => {
  let component: BusListComponent;
  let fixture: ComponentFixture<BusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#removeBus() should call #busListRemove.next', () => {
    const spy = spyOn(component.busListRemove, 'next');
    const bus = { id: 1, stationId: 1, type: BusType.MINIBUS, plate: 'BUS-123-456' };
    component.removeBus(bus);
    expect(spy).toHaveBeenCalledWith(bus.id);
  });
});

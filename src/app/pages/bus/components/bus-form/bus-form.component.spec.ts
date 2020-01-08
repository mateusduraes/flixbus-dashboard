import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusFormComponent } from './bus-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@modules/button/button.module';
import { BusType } from '@models/bus';

describe('BusFormComponent', () => {
  let component: BusFormComponent;
  let fixture: ComponentFixture<BusFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusFormComponent],
      imports: [FormsModule, ReactiveFormsModule, ButtonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#submitForm() should call #busFormInvalid.next if the form is not valid', () => {
    const spy = spyOn(component.busFormInvalid, 'next');
    component.resetForm();
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });

  it('#submitForm() should call #busFormSubmit.next if the form is valid', () => {
    const spy = spyOn(component.busFormSubmit, 'next');
    component.resetForm();
    component.busForm.setValue({
      stationId: 1,
      type: BusType.REGULAR,
      plate: 'BUS-123-456',
    });
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });
});

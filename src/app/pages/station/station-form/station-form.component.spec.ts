import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationFormComponent } from './station-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '@modules/loading/loading.module';
import { ButtonModule } from '@modules/button/button.module';
import { BusType } from '@models/bus';

describe('StationFormComponent', () => {
  let component: StationFormComponent;
  let fixture: ComponentFixture<StationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StationFormComponent],
      imports: [FormsModule, ReactiveFormsModule, LoadingModule, ButtonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#submitForm() should call #stationFormInvalid if the form is not valid', () => {
    const spy = spyOn(component.stationFormInvalid, 'next');
    component.resetForm();
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });

  it('#submitForm() should call #stationFormSubmit if the form is valid', () => {
    const spy = spyOn(component.stationFormSubmit, 'next');
    component.resetForm();
    component.stationForm.setValue({
      countSlots: 10,
      buses: [
        {
          stationId: 1,
          type: BusType.REGULAR,
          plate: 'BUS-123-456',
        },
      ],
    });
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });
});

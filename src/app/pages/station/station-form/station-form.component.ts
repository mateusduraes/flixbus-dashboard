import { ICreateStationPayload } from '@models/create-station-payload';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.scss'],
})
export class StationFormComponent implements OnInit {
  @Input() busTypes: string[] = [];
  @Input() isLoading: boolean = false;
  @Output() stationFormSubmit: EventEmitter<ICreateStationPayload> = new EventEmitter<ICreateStationPayload>();
  @Output() stationFormInvalid: EventEmitter<void> = new EventEmitter<void>();
  public stationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get formArray() {
    return this.stationForm.get('buses') as FormArray;
  }

  public submitForm(): void {
    this.stationForm.markAllAsTouched();
    const { invalid } = this.stationForm;
    if (invalid) {
      this.stationFormInvalid.next();
      return;
    }
    this.stationFormSubmit.next({
      station: {
        countSlots: this.stationForm.get('countSlots').value,
      },
      buses: this.stationForm.get('buses').value,
    });
  }

  public resetForm(): void {
    this.stationForm.reset();
  }

  public addBus(): void {
    const buses = this.stationForm.get('buses') as FormArray;
    const countSlots = this.stationForm.get('countSlots').value;
    if (buses.length < countSlots) {
      buses.push(this.createBus());
    }
  }

  public removeBus(index: number): void {
    const buses = this.stationForm.get('buses') as FormArray;
    buses.removeAt(index);
  }

  private initForm(): void {
    this.stationForm = this.formBuilder.group({
      countSlots: [1, [Validators.required, Validators.min(1)]],
      buses: this.formBuilder.array([this.createBus()]),
    });
  }

  private createBus(): FormGroup {
    return this.formBuilder.group({
      stationId: [],
      type: [null, [Validators.required]],
      plate: ['', [Validators.required, Validators.pattern(/^BUS-[0-9]{3}-[0-9]{3}$/)]],
    });
  }

  ngOnInit() {
    this.initForm();
  }
}

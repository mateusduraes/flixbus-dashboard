import { IStation } from '@models/station';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBus } from '@models/bus';

@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.scss'],
})
export class BusFormComponent implements OnInit {
  public busForm: FormGroup;
  @Output() busFormSubmit: EventEmitter<IBus> = new EventEmitter<IBus>();
  @Output() busFormInvalid: EventEmitter<void> = new EventEmitter<void>();
  @Input() stationList: IStation[] = [];
  @Input() busTypes: string[] = [];
  @Input() isLoading: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

  public submitForm(): void {
    this.busForm.markAllAsTouched();
    const { invalid } = this.busForm;
    if (invalid) {
      this.busFormInvalid.next();
      return;
    }
    this.busFormSubmit.next(this.busForm.value);
  }

  public resetForm(): void {
    this.busForm.reset();
  }

  private initForm(): void {
    this.busForm = this.formBuilder.group({
      stationId: [null, [Validators.required]],
      type: [null, [Validators.required]],
      plate: ['', [Validators.required, Validators.pattern(/^BUS-[0-9]{3}-[0-9]{3}$/)]],
    });
  }

  ngOnInit() {
    this.initForm();
  }
}

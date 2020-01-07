import { IStation } from 'src/app/models/station';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBus } from 'src/app/models/bus';

@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.scss'],
})
export class BusFormComponent implements OnInit {
  public busForm: FormGroup;
  @Output() busFormSubmit: EventEmitter<IBus> = new EventEmitter<IBus>();
  @Input() stationList: IStation[] = [];
  @Input() busTypes: string[] = [];
  constructor(private formBuilder: FormBuilder) {}

  public submitForm(): void {
    // check form valid, show something to the user
    Object.keys(this.busForm.controls).forEach(key => this.busForm.controls[key].markAsTouched());
    this.busFormSubmit.next(this.busForm.value);
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

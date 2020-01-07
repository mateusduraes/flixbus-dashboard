import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationFormComponent } from './station-form.component';

describe('StationFormComponent', () => {
  let component: StationFormComponent;
  let fixture: ComponentFixture<StationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

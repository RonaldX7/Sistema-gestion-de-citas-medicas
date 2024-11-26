import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFeaturesComponent } from './patient-features.component';

describe('PatientFeaturesComponent', () => {
  let component: PatientFeaturesComponent;
  let fixture: ComponentFixture<PatientFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

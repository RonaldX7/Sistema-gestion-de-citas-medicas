import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFeaturesComponent } from './doctor-features.component';

describe('DoctorFeaturesComponent', () => {
  let component: DoctorFeaturesComponent;
  let fixture: ComponentFixture<DoctorFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

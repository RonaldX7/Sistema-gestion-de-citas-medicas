import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCitaComponent } from './conf-cita.component';

describe('ConfCitaComponent', () => {
  let component: ConfCitaComponent;
  let fixture: ComponentFixture<ConfCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

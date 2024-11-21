import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitarCitaComponent } from './citar-cita.component';

describe('CitarCitaComponent', () => {
  let component: CitarCitaComponent;
  let fixture: ComponentFixture<CitarCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitarCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

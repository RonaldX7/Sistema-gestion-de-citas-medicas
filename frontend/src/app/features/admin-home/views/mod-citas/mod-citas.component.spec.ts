import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCitasComponent } from './mod-citas.component';

describe('ModCitasComponent', () => {
  let component: ModCitasComponent;
  let fixture: ComponentFixture<ModCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

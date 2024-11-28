import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistamedicComponent } from './vistamedic.component';

describe('VistamedicComponent', () => {
  let component: VistamedicComponent;
  let fixture: ComponentFixture<VistamedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistamedicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistamedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

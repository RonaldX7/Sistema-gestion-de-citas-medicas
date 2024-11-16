import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDocComponent } from './mod-doc.component';

describe('ModDocComponent', () => {
  let component: ModDocComponent;
  let fixture: ComponentFixture<ModDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

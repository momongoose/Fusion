import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFPraeComponent } from './admin-f-prae.component';

describe('AdminFPraeComponent', () => {
  let component: AdminFPraeComponent;
  let fixture: ComponentFixture<AdminFPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

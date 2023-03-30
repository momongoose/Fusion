import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSPraeComponent } from './admin-s-prae.component';

describe('AdminSPraeComponent', () => {
  let component: AdminSPraeComponent;
  let fixture: ComponentFixture<AdminSPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

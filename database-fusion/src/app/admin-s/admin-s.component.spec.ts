import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSComponent } from './admin-s.component';

describe('AdminSComponent', () => {
  let component: AdminSComponent;
  let fixture: ComponentFixture<AdminSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

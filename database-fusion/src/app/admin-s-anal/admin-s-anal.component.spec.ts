import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSAnalComponent } from './admin-s-anal.component';

describe('AdminSAnalComponent', () => {
  let component: AdminSAnalComponent;
  let fixture: ComponentFixture<AdminSAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

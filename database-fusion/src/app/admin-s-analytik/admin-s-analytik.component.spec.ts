import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSAnalytikComponent } from './admin-s-analytik.component';

describe('AdminSAnalComponent', () => {
  let component: AdminSAnalytikComponent;
  let fixture: ComponentFixture<AdminSAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

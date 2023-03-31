import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFAnalytikComponent } from './admin-f-analytik.component';

describe('AdminFAnalComponent', () => {
  let component: AdminFAnalytikComponent;
  let fixture: ComponentFixture<AdminFAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

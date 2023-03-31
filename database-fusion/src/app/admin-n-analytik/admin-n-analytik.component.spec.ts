import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNAnalytikComponent } from './admin-n-analytik.component';

describe('AdminNAnalComponent', () => {
  let component: AdminNAnalytikComponent;
  let fixture: ComponentFixture<AdminNAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

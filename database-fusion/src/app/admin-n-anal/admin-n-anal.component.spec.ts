import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNAnalComponent } from './admin-n-anal.component';

describe('AdminNAnalComponent', () => {
  let component: AdminNAnalComponent;
  let fixture: ComponentFixture<AdminNAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

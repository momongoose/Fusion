import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNComponent } from './admin-n.component';

describe('AdminNComponent', () => {
  let component: AdminNComponent;
  let fixture: ComponentFixture<AdminNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

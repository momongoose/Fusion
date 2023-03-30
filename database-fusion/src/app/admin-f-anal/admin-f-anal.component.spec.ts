import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFAnalComponent } from './admin-f-anal.component';

describe('AdminFAnalComponent', () => {
  let component: AdminFAnalComponent;
  let fixture: ComponentFixture<AdminFAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

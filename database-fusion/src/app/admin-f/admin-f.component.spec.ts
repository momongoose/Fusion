import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFComponent } from './admin-f.component';

describe('AdminFComponent', () => {
  let component: AdminFComponent;
  let fixture: ComponentFixture<AdminFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPraeComponent } from './admin-prae.component';

describe('AdminPraeComponent', () => {
  let component: AdminPraeComponent;
  let fixture: ComponentFixture<AdminPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

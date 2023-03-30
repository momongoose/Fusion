import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNPraeComponent } from './admin-n-prae.component';

describe('AdminNPraeComponent', () => {
  let component: AdminNPraeComponent;
  let fixture: ComponentFixture<AdminNPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

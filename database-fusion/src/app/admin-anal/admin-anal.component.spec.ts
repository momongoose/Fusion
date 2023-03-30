import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalComponent } from './admin-anal.component';

describe('AdminAnalComponent', () => {
  let component: AdminAnalComponent;
  let fixture: ComponentFixture<AdminAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

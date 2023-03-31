import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalytikComponent } from './admin-analytik.component';

describe('AdminAnalComponent', () => {
  let component: AdminAnalytikComponent;
  let fixture: ComponentFixture<AdminAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

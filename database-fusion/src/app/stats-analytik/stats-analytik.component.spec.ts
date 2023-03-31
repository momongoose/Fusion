import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAnalytikComponent } from './stats-analytik.component';

describe('StatsAnalComponent', () => {
  let component: StatsAnalytikComponent;
  let fixture: ComponentFixture<StatsAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

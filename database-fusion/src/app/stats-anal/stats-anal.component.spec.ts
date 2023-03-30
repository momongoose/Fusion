import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAnalComponent } from './stats-anal.component';

describe('StatsAnalComponent', () => {
  let component: StatsAnalComponent;
  let fixture: ComponentFixture<StatsAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

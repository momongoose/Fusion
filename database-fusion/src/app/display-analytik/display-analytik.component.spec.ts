import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAnalytikComponent } from './display-analytik.component';

describe('DisplayAnalComponent', () => {
  let component: DisplayAnalytikComponent;
  let fixture: ComponentFixture<DisplayAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

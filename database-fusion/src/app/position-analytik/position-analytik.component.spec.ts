import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionAnalytikComponent } from './position-analytik.component';

describe('PositionAnalComponent', () => {
  let component: PositionAnalytikComponent;
  let fixture: ComponentFixture<PositionAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

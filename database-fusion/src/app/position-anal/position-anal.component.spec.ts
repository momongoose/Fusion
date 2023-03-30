import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionAnalComponent } from './position-anal.component';

describe('PositionAnalComponent', () => {
  let component: PositionAnalComponent;
  let fixture: ComponentFixture<PositionAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

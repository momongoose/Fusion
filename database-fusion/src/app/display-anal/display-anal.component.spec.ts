import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAnalComponent } from './display-anal.component';

describe('DisplayAnalComponent', () => {
  let component: DisplayAnalComponent;
  let fixture: ComponentFixture<DisplayAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

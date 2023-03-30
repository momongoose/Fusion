import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPraeComponent } from './display-prae.component';

describe('DisplayPraeComponent', () => {
  let component: DisplayPraeComponent;
  let fixture: ComponentFixture<DisplayPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

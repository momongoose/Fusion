import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionPraeComponent } from './position-prae.component';

describe('PositionPraeComponent', () => {
  let component: PositionPraeComponent;
  let fixture: ComponentFixture<PositionPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPraeComponent } from './stats-prae.component';

describe('StatsPraeComponent', () => {
  let component: StatsPraeComponent;
  let fixture: ComponentFixture<StatsPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

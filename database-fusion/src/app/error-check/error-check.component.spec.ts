import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCheckComponent } from './error-check.component';

describe('ErrorCheckComponent', () => {
  let component: ErrorCheckComponent;
  let fixture: ComponentFixture<ErrorCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

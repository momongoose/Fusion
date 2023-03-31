import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAnalytikComponent } from './settings-analytik.component';

describe('SettingsAnalComponent', () => {
  let component: SettingsAnalytikComponent;
  let fixture: ComponentFixture<SettingsAnalytikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAnalytikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAnalytikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

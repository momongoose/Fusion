import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAnalComponent } from './settings-anal.component';

describe('SettingsAnalComponent', () => {
  let component: SettingsAnalComponent;
  let fixture: ComponentFixture<SettingsAnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAnalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

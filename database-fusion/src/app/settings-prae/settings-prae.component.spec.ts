import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPraeComponent } from './settings-prae.component';

describe('SettingsPraeComponent', () => {
  let component: SettingsPraeComponent;
  let fixture: ComponentFixture<SettingsPraeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPraeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPraeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

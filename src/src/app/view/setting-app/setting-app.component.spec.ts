import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAppComponent } from './setting-app.component';

describe('SettingAppComponent', () => {
  let component: SettingAppComponent;
  let fixture: ComponentFixture<SettingAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

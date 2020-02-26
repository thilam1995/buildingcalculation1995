import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolinghabitwindowitemComponent } from './coolinghabitwindowitem.component';

describe('CoolinghabitwindowitemComponent', () => {
  let component: CoolinghabitwindowitemComponent;
  let fixture: ComponentFixture<CoolinghabitwindowitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolinghabitwindowitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolinghabitwindowitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

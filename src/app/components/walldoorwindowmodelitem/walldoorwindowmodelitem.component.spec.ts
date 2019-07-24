import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalldoorwindowmodelitemComponent } from './walldoorwindowmodelitem.component';

describe('WalldoorwindowmodelitemComponent', () => {
  let component: WalldoorwindowmodelitemComponent;
  let fixture: ComponentFixture<WalldoorwindowmodelitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalldoorwindowmodelitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalldoorwindowmodelitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

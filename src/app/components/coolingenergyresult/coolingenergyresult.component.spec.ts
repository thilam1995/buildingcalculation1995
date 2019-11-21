import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolingenergyresultComponent } from './coolingenergyresult.component';

describe('CoolingenergyresultComponent', () => {
  let component: CoolingenergyresultComponent;
  let fixture: ComponentFixture<CoolingenergyresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolingenergyresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolingenergyresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

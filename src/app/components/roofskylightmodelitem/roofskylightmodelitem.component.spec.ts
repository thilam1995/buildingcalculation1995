import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoofskylightmodelitemComponent } from './roofskylightmodelitem.component';

describe('RoofskylightmodelitemComponent', () => {
  let component: RoofskylightmodelitemComponent;
  let fixture: ComponentFixture<RoofskylightmodelitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoofskylightmodelitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoofskylightmodelitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloormodelitemComponent } from './floormodelitem.component';

describe('FloormodelitemComponent', () => {
  let component: FloormodelitemComponent;
  let fixture: ComponentFixture<FloormodelitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloormodelitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloormodelitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

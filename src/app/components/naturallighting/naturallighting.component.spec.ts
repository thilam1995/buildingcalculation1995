import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturallightingComponent } from './naturallighting.component';

describe('NaturallightingComponent', () => {
  let component: NaturallightingComponent;
  let fixture: ComponentFixture<NaturallightingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturallightingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturallightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

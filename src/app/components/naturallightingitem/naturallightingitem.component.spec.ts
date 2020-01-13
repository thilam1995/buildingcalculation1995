import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturallightingitemComponent } from './naturallightingitem.component';

describe('NaturallightingitemComponent', () => {
  let component: NaturallightingitemComponent;
  let fixture: ComponentFixture<NaturallightingitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturallightingitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturallightingitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

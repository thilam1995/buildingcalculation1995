import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoofformComponent } from './roofform.component';

describe('RoofformComponent', () => {
  let component: RoofformComponent;
  let fixture: ComponentFixture<RoofformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoofformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoofformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

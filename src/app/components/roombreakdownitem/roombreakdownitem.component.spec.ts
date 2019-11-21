import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoombreakdownitemComponent } from './roombreakdownitem.component';

describe('RoombreakdownitemComponent', () => {
  let component: RoombreakdownitemComponent;
  let fixture: ComponentFixture<RoombreakdownitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoombreakdownitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoombreakdownitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

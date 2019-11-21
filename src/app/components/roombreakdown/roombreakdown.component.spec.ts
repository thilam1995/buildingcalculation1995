import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoombreakdownComponent } from './roombreakdown.component';

describe('RoombreakdownComponent', () => {
  let component: RoombreakdownComponent;
  let fixture: ComponentFixture<RoombreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoombreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoombreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

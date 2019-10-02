import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkylightformComponent } from './skylightform.component';

describe('SkylightformComponent', () => {
  let component: SkylightformComponent;
  let fixture: ComponentFixture<SkylightformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkylightformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkylightformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

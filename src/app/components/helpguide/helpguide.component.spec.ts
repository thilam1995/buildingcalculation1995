import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpguideComponent } from './helpguide.component';

describe('HelpguideComponent', () => {
  let component: HelpguideComponent;
  let fixture: ComponentFixture<HelpguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

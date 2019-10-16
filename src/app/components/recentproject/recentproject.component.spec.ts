import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentprojectComponent } from './recentproject.component';

describe('RecentprojectComponent', () => {
  let component: RecentprojectComponent;
  let fixture: ComponentFixture<RecentprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

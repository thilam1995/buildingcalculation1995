import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultcarouselComponent } from './resultcarousel.component';

describe('ResultcarouselComponent', () => {
  let component: ResultcarouselComponent;
  let fixture: ComponentFixture<ResultcarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultcarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveventilationComponent } from './passiveventilation.component';

describe('PassiveventilationComponent', () => {
  let component: PassiveventilationComponent;
  let fixture: ComponentFixture<PassiveventilationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveventilationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveventilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolingroomitemComponent } from './coolingroomitem.component';

describe('CoolingroomitemComponent', () => {
  let component: CoolingroomitemComponent;
  let fixture: ComponentFixture<CoolingroomitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolingroomitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolingroomitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

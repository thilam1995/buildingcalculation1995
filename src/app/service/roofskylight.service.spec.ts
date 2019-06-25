import { TestBed } from '@angular/core/testing';

import { RoofskylightService } from './roofskylight.service';

describe('RoofskylightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoofskylightService = TestBed.get(RoofskylightService);
    expect(service).toBeTruthy();
  });
});

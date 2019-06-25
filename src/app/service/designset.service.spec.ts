import { TestBed } from '@angular/core/testing';

import { DesignsetService } from './designset.service';

describe('DesignsetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignsetService = TestBed.get(DesignsetService);
    expect(service).toBeTruthy();
  });
});

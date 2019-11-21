import { TestBed } from '@angular/core/testing';

import { RoomserviceService } from './roomservice.service';

describe('RoomserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomserviceService = TestBed.get(RoomserviceService);
    expect(service).toBeTruthy();
  });
});

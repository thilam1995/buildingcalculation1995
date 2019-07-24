import { TestBed } from '@angular/core/testing';

import { BuildingmodelService } from './buildingmodel.service';

describe('BuildingmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildingmodelService = TestBed.get(BuildingmodelService);
    expect(service).toBeTruthy();
  });
});

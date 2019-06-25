import { TestBed } from '@angular/core/testing';

import { PasswordcryptService } from './passwordcrypt.service';

describe('PasswordcryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordcryptService = TestBed.get(PasswordcryptService);
    expect(service).toBeTruthy();
  });
});

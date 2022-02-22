import { TestBed } from '@angular/core/testing';

import { AutentifiService } from './autentifi.service';

describe('AutentifiService', () => {
  let service: AutentifiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentifiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

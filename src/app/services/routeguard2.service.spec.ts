import { TestBed } from '@angular/core/testing';

import { Routeguard2Service } from './routeguard2.service';

describe('Routeguard2Service', () => {
  let service: Routeguard2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Routeguard2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

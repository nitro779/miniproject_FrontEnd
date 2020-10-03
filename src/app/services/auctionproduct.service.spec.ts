import { TestBed } from '@angular/core/testing';

import { AuctionproductService } from './auctionproduct.service';

describe('AuctionproductService', () => {
  let service: AuctionproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

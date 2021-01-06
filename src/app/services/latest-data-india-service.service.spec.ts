import { TestBed } from '@angular/core/testing';

import { LatestDataIndiaServiceService } from './latest-data-india-service.service';

describe('LatestDataIndiaServiceService', () => {
  let service: LatestDataIndiaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestDataIndiaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

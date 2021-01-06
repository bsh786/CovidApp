import { TestBed } from '@angular/core/testing';

import { HistoryIndiaDataService } from './history-india-data.service';

describe('HistoryIndiaDataService', () => {
  let service: HistoryIndiaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryIndiaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

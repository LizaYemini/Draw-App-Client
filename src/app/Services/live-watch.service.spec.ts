import { TestBed } from '@angular/core/testing';

import { LiveWatchService } from './live-watch.service';

describe('LiveWatchService', () => {
  let service: LiveWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

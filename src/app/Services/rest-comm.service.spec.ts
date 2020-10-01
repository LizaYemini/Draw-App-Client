import { TestBed } from '@angular/core/testing';

import { RestCommService } from './rest-comm.service';

describe('RestCommService', () => {
  let service: RestCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

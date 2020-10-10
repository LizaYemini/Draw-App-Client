import { TestBed } from '@angular/core/testing';

import { MarkerMessangerService } from './marker-messanger.service';

describe('MarkerMessangerService', () => {
  let service: MarkerMessangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerMessangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

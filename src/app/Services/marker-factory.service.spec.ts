import { TestBed } from '@angular/core/testing';

import { MarkerFactoryService } from './marker-factory.service';

describe('MarkerFactoryService', () => {
  let service: MarkerFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

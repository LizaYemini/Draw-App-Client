import { TestBed } from '@angular/core/testing';

import { LocalDrawingService } from './local-drawing.service';

describe('LocalDrawingService', () => {
  let service: LocalDrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

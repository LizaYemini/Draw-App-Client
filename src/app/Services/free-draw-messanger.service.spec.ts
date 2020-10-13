import { TestBed } from '@angular/core/testing';

import { FreeDrawMessangerService } from './free-draw-messanger.service';

describe('FreeDrawMessangerService', () => {
  let service: FreeDrawMessangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeDrawMessangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

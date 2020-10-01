import { TestBed } from '@angular/core/testing';

import { SharedDocumentsService } from './shared-documents.service';

describe('SharedDocumentsService', () => {
  let service: SharedDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

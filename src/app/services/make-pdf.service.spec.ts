import { TestBed } from '@angular/core/testing';

import { MakePdfService } from '../services/make-pdf.service';

describe('MakePdfService', () => {
  let service: MakePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakePdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

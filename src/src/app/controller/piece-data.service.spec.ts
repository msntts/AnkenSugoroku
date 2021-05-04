import { TestBed } from '@angular/core/testing';

import { PieceDataService } from './piece-data.service';

describe('PieceDataService', () => {
  let service: PieceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

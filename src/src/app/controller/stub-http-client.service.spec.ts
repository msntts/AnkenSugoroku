import { TestBed } from '@angular/core/testing';

import { StubHttpClientService } from './stub-http-client.service';

describe('StubHttpClientService', () => {
  let service: StubHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StubHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

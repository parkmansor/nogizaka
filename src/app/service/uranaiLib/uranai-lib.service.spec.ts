import { TestBed } from '@angular/core/testing';

import { UranaiLibService } from './uranai-lib.service';

describe('UranaiLibService', () => {
  let service: UranaiLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UranaiLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

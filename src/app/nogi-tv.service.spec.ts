import { TestBed } from '@angular/core/testing';

import { NogiTvService } from './nogi-tv.service';

describe('NogiTvService', () => {
  let service: NogiTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NogiTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

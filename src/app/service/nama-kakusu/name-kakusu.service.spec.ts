import { TestBed } from '@angular/core/testing';

import { NameKakusuService } from './name-kakusu.service';

describe('NameKakusuService', () => {
  let service: NameKakusuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameKakusuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

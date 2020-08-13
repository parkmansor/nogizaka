import { TestBed } from '@angular/core/testing';

import { NogiMemberService } from './nogi-member.service';

describe('NogiMemberService', () => {
  let service: NogiMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NogiMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

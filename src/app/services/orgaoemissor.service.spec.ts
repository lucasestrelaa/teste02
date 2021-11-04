import { TestBed } from '@angular/core/testing';

import { OrgaoemissorService } from './orgaoemissor.service';

describe('OrgaoemissorService', () => {
  let service: OrgaoemissorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgaoemissorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

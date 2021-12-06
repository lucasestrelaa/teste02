import { TestBed } from '@angular/core/testing';

import { DescontosService } from './descontos.service';

describe('DescontosService', () => {
  let service: DescontosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescontosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

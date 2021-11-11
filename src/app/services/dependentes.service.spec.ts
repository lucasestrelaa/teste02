import { TestBed } from '@angular/core/testing';

import { DependentesService } from './dependentes.service';

describe('DependentesService', () => {
  let service: DependentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

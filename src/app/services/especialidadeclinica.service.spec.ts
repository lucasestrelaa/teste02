import { TestBed } from '@angular/core/testing';

import { EspecialidadeclinicaService } from './especialidadeclinica.service';

describe('EspecialidadeclinicaService', () => {
  let service: EspecialidadeclinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialidadeclinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

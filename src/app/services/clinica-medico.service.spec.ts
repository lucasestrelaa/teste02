import { TestBed } from '@angular/core/testing';

import { ClinicaMedicoService } from './clinica-medico.service';

describe('ClinicaMedicoService', () => {
  let service: ClinicaMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicaMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

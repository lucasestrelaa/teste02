import { TestBed } from '@angular/core/testing';

import { MedicoespecialidadeService } from './medicoespecialidade.service';

describe('MedicoespecialidadeService', () => {
  let service: MedicoespecialidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicoespecialidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

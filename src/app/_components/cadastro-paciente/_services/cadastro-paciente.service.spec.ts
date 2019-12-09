import { TestBed } from '@angular/core/testing';

import { CadastroPacienteService } from './cadastro-paciente.service';

describe('CadastroPacienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroPacienteService = TestBed.get(CadastroPacienteService);
    expect(service).toBeTruthy();
  });
});

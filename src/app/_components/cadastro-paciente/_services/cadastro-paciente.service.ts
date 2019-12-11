import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../_models/paciente';
import { PacienteForm } from '../_models/paciente-form';

@Injectable({
  providedIn: 'root'
})
export class CadastroPacienteService {

  private uri = environment.localhost;
  private port = ':8080';
  private path = '/v1/api/cadastro-paciente';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Função de requisição à API para cadastrar um novo paciente.
   *
   * @param form Formulário com dados do paciente a ser cadastrado
   * @returns Observable com dados do paciente
   */
  cadastrarPaciente(form: PacienteForm): Observable<Paciente> {
    const url = this.uri + this.port + this.path;
    return this.httpClient.post<Paciente>(url, form);
  }

  /**
   * Função de requisição à API para buscar o menor número do prontuário disponível.
   *
   * @returns Observable com número do prontuário.
   */
  obterNumeroProntuario(): Observable<number> {
    const url = this.uri + this.port + this.path + '/obter-numero-prontuario';
    return this.httpClient.get<number>(url);
  }

}

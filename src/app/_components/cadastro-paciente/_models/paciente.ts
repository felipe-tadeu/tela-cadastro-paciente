import { SexoEnum } from './sexo-enum';

export class Paciente {
  id: number;
  nome: string;
  cpf: string;
  seDesejaUsarNomeSocial: boolean;
  nomeSocial: string;
  numeroProntuario: number;
  dataNascimento: Date;
  sexo: SexoEnum;
  endereco: Endereco;
}

class Endereco {
  id: number;
  cep: number;
  endereco: string;
  numero: number;
  complemento: string;
}

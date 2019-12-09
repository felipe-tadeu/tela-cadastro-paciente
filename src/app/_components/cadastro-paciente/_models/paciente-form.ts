import { SexoEnum } from './sexo-enum';

export class PacienteForm {
  nome: string;
  cpf: string;
  seDesejaUsarNomeSocial: boolean;
  nomeSocial: string;
  numeroProntuario: number;
  dataNascimento: Date;
  sexo: SexoEnum;
  endereco: EnderecoForm;
}

class EnderecoForm {
  cep: number;
  endereco: string;
  numero: number;
  complemento: string;
}

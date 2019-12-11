import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { CustomValidators } from './_utils/custom-validators';
import { CadastroPacienteService } from './_services/cadastro-paciente.service';

// Array de validators para os campos de nome
const validatorsParaCampoNome: ValidatorFn[] = [Validators.required,
Validators.minLength(2),
Validators.pattern(
  '^[A-Za-z]+([\']{1}[A-Za-z]+([ ]{1})?)?(([A-Za-z]+[\']{1})?([A-Za-z]*)?([A-Za-z]+([ ]{1})?))*$'
)];

// jQuery
declare var $: any;

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {

  formularioCadastroPaciente: FormGroup;
  loading = false;
  aceitouOsTermosNomeSocial = false;
  mensagemSucesso = false;
  mensagemErro: string;
  loadingNumeroProntuario = false;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroPacienteService: CadastroPacienteService
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  /**
   * Gera formulário (FormGroup) setando valores iniciais e validators.
   */
  generateForm() {
    this.formularioCadastroPaciente = this.formBuilder.group({
      nome: ['', validatorsParaCampoNome],
      cpf: ['', [Validators.required, CustomValidators.isValidCpf()]],
      seDesejaUsarNomeSocial: [false],
      nomeSocial: [''],
      numeroProntuario: ['', Validators.required],
      dataNascimento: ['', [Validators.required, CustomValidators.dateGreaterThanTodayValidator()]],
      sexo: ['', Validators.required],
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        endereco: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['']
      })
    });
  }

  /**
   * Função do envio dos dados do paciente. Após validação do formulário, é feita uma requisição à API para o cadastro do paciente.
   */
  onSubmit() {
    if (this.formularioCadastroPaciente.invalid) {
      this.formularioCadastroPaciente.markAllAsTouched();
    } else if (!this.loading && !this.loadingNumeroProntuario) {
      this.clearAlerts();
      this.loading = true;
      this.cadastroPacienteService.cadastrarPaciente(this.formularioCadastroPaciente.value).subscribe(
        res => {
          this.mensagemSucesso = true;
          this.generateForm();
          this.loading = false;
        },
        err => {
          this.mensagemErro = err.error.message;
          this.mensagemSucesso = false;
          this.loading = false;
        }
      );
    }
  }

  /**
   * Muda os parâmetros necessários para o campo "nomeSocial" quando valor do campo "seDesejaUsarNomeSocial" for alterado.
   */
  changeNomeSocialRequiredFiled() {
    if (this.formularioCadastroPaciente.get('seDesejaUsarNomeSocial').value) {
      $('#modalDeclaracao').modal('show');
      this.formularioCadastroPaciente.get('nomeSocial').setValidators(validatorsParaCampoNome);
      this.formularioCadastroPaciente.get('nomeSocial').markAsPristine();
      this.formularioCadastroPaciente.get('nomeSocial').markAsUntouched();
      this.formularioCadastroPaciente.get('nomeSocial').updateValueAndValidity();
    } else {
      this.formularioCadastroPaciente.get('nomeSocial').clearValidators();
    }
  }

  /**
   * Setar varível da visualização dos alertas para null.
   */
  clearAlerts() {
    this.mensagemSucesso = false;
    this.mensagemErro = null;
  }

  /**
   * Função para obter número do prontuário. Será realizada uma requisição à API para buscar o menor número do prontuário disponível.
   */
  getNumeroProntuario() {
    if (!this.loading && !this.loadingNumeroProntuario) {
      this.clearAlerts();
      this.loadingNumeroProntuario = true;
      this.cadastroPacienteService.obterNumeroProntuario().subscribe(
        res => {
          this.formularioCadastroPaciente.get('numeroProntuario').setValue(res);
          this.loadingNumeroProntuario = false;
        },
        err => {
          this.mensagemErro = err.error.message;
          this.loadingNumeroProntuario = false;
        }
      );
    }
  }

}

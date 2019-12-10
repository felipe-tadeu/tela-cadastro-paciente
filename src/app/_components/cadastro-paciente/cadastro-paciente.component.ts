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
  cadastroComSucesso: boolean = null;

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
   *
   * TODO mostrar mensagem de retorno quando em caso de erro.
   */
  onSubmit() {
    if (this.formularioCadastroPaciente.invalid) {
      this.formularioCadastroPaciente.markAllAsTouched();
    } else if (!this.loading) {
      this.loading = true;
      this.cadastroPacienteService.cadastrarPaciente(this.formularioCadastroPaciente.value).subscribe(
        res => {
          this.cadastroComSucesso = true;
          this.generateForm();
          this.loading = false;
        },
        err => {
          this.cadastroComSucesso = false;
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
    this.cadastroComSucesso = null;
  }

  // TODO geração do número de prontuário sequencial (back) !IMPORTANT

}

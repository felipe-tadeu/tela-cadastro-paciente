import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { CustomValidators } from './_utils/custom-validators';

// Array de validators para os campos de nome
const validatorsParaCampoNome: ValidatorFn[] = [Validators.required,
  Validators.minLength(2),
  Validators.pattern(
    '^[A-Za-z]+([\']{1}[A-Za-z]+([ ]{1})?)?(([A-Za-z]+[\']{1})?([A-Za-z]*)?([A-Za-z]+([ ]{1})?))*$'
  )];

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {

  formularioCadastroPaciente: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
        complemento: ['', Validators.required]
      })
    });
  }

  // TODO Requisição de envio de dados para API !IMPORTANT
  onSubmit() {
    if (this.formularioCadastroPaciente.invalid) {
      this.formularioCadastroPaciente.markAllAsTouched();
    } else {
      console.log('Enviando formulário...');
    }
  }

  /**
   * Muda os parâmetros necessários para o campo "nomeSocial" quando valor do campo "seDesejaUsarNomeSocial" for alterado.
   */
  changeNomeSocialRequiredFiled() {
    if (this.formularioCadastroPaciente.get('seDesejaUsarNomeSocial').value) {
      this.formularioCadastroPaciente.get('nomeSocial').setValidators(validatorsParaCampoNome);
      this.formularioCadastroPaciente.get('nomeSocial').markAsPristine();
      this.formularioCadastroPaciente.get('nomeSocial').markAsUntouched();
      this.formularioCadastroPaciente.get('nomeSocial').updateValueAndValidity();
    } else {
      this.formularioCadastroPaciente.get('nomeSocial').clearValidators();
    }
  }

  // TODO Opção da visualização do decreto
  // TODO Modal para termo de aceitação do nome social
  // TODO Geração do número de prontuário sequencial (back) !IMPORTANT

}

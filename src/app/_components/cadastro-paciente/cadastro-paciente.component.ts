import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './_utils/custom-validators';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {

  seDesejaUsarNomeSocial = false;
  formularioCadastroPaciente: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  // TODO
  generateForm() {
    this.formularioCadastroPaciente = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cpf: ['', [Validators.required, CustomValidators.isValidCpf()]],
      nomeSocial: [''],
      numeroProntuario: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        endereco: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['', Validators.required]
      })
    });
  }

  // TODO
  onSubmit() {
    if (this.formularioCadastroPaciente.invalid) {
      this.formularioCadastroPaciente.markAllAsTouched();
    } else {
      console.log('Enviando formulário...');
    }
    console.log(this.formularioCadastroPaciente.value);
  }

  /**
   * Função para mudar os parâmetros necessários para o campo "nomeSocial" quando valor do campo "seDesejaUsarNomeSocial" for alterado.
   */
  changeNomeSocialRequiredFiled() {
    if (this.seDesejaUsarNomeSocial) {
      this.formularioCadastroPaciente.get('nomeSocial').setValidators([Validators.required]);
      this.formularioCadastroPaciente.get('nomeSocial').markAsPristine();
      this.formularioCadastroPaciente.get('nomeSocial').markAsUntouched();
      this.formularioCadastroPaciente.get('nomeSocial').updateValueAndValidity();
    } else {
      this.formularioCadastroPaciente.get('nomeSocial').clearValidators();
    }
  }

  /**
   * Função para limpar dados do formulário.
   * TODO
   */
  clearForm() {
    this.formularioCadastroPaciente.reset();
  }

}

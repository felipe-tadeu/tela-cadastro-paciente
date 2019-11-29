import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPacienteComponent } from './_components/cadastro-paciente/cadastro-paciente.component';
import { LayoutComponent } from './_components/_utils/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroPacienteComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

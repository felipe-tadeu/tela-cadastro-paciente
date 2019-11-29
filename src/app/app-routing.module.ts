import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroPacienteComponent } from './_components/cadastro-paciente/cadastro-paciente.component';
import { LayoutComponent } from './_components/_utils/layout/layout.component';


const routes: Routes = [
  {
    path: 'cadastro-paciente',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CadastroPacienteComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'cadastro-paciente',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

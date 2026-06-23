import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/login/login.component';
import { OptionsComponent } from './components/options/options.component';
import { ActualizarUserComponent } from './components/actualizar-user/actualizar-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'articulos', pathMatch: 'full' },
  { path: 'articulos', component: ArticlesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'opciones/:id', component: OptionsComponent},
  { path: 'actualizar/:id', component: ActualizarUserComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

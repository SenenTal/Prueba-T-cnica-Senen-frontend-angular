import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/login/login.component';
import { OptionsComponent } from './components/options/options.component';
import { ActualizarUserComponent } from './components/actualizar-user/actualizar-user.component';
import { ArticlesDetailComponent } from './components/articles-detail/articles-detail.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'articulos', pathMatch: 'full' },
  { path: 'articulos', component: ArticlesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'opciones/:id', component: OptionsComponent },
  { path: 'actualizarUsuario/:id', component: ActualizarUserComponent },
  { path: 'articulos/:id', component: ArticlesDetailComponent },
  { path: 'crearArticulo/:id', component: CreateArticleComponent },
  { path: 'actualizarArticulo/:id', component: UpdateArticleComponent },
  { path: 'crearUsuario', component: CreateUserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

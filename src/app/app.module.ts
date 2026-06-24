import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { SessionComponent } from './components/session/session.component';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './components/options/options.component';
import { ActualizarUserComponent } from './components/actualizar-user/actualizar-user.component';
import { ArticlesDetailComponent } from './components/articles-detail/articles-detail.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticlesComponent,
    SessionComponent,
    OptionsComponent,
    ActualizarUserComponent,
    ArticlesDetailComponent,
    CreateArticleComponent,
    UpdateArticleComponent,
    CreateUserComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

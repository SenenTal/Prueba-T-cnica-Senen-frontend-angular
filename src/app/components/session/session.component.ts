import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-session',
  standalone: false,
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent implements OnInit {

  sesion: boolean = false;
  nickname: string | null = null;

  constructor(private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.sesion$.subscribe(
      valor => {
        this.sesion = valor;
      }
    )

    this.auth.user$.subscribe(user=> {
      this.nickname = user?.nickname ?? null;
    })
  }

  cerrarSesion() {
    this.auth.logout();
    //Debe redirigir a otra ruta que no sea login al cerrar sesion
    this.router.navigate(['/articulos'], { replaceUrl: true});
  }

  iniciarSesion(){
    this.router.navigate(['/login']);
  }

  irAOpciones(){
    const id = this.auth.getUserId();
    if(id === null || id === undefined){
      console.log('No hay usuario logueado');
      return
    }
    this.router.navigate(['/opciones', id]);
  }
  crearArticulo(){
    const id = this.auth.getUserId();
    if(id === null || id === undefined){
      console.log('No hay usuario inicializado');
      return;
    }
    this.router.navigate(['/crearArticulo', id]);
  }
  crearUsuario(){
    this.router.navigate(['/crearUsuario']);
  }

}

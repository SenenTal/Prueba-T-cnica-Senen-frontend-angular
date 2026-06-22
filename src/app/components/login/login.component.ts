import { Component } from '@angular/core';
import { UserAccessDTO } from '../../models/usuarios/usuario-access.dto';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: UserAccessDTO = {
    username: '',
    password: ''
  };
  constructor(private service: UsuariosService) { }

  iniciarSesion() {
    if (!this.usuario.username) {
      Swal.fire(
        'Escriba en username',
        'Datos en blanco',
        'info'
      );
      return;
    } else if (!this.usuario.password) {
      Swal.fire(
        'Escriba en password',
        'Datos en blanco',
        'info'
      );
      return;
    } else {
      this.service.iniciarSesion(this.usuario).
      subscribe({
        next:(user) => {
          console.log(user);
        },
        error:(error)=>{
          console.log(error);
        }
      }
      );
    }
  }
}

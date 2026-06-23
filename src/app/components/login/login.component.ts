import { Component } from '@angular/core';
import { UserAccessDTO } from '../../models/usuarios/usuario-access.dto';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  nickname: string = '';
  constructor(private service: UsuariosService,
    private auth: AuthService,
    private router: Router
  ) { }

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
      this.service.iniciarSesion(this.usuario)
        .subscribe({
          next: (res) => {

            if (res.success) {

              const user = res.data;

              this.auth.login(user);

              this.router.navigate(['/articulos']);
            }

          },
          error: (err) =>{ console.log(err);
          Swal.fire(
            'Error',
            'Credenciales no correctas',
            'error'
          )
        }
        });
    }
  }
}
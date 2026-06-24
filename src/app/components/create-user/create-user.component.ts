import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { UserDTO } from '../../models/usuarios/usuario.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  //Definir las variables del usuario
  user: UserDTO = {
    usuario: '',
    password: '',
    nickname: ''
  }

  constructor(private service: UsuariosService,
    private router: Router
  ) { }

  crearUsuario() {
    if (!this.user.usuario ||
      !this.user.nickname ||
      !this.user.password) {
      Swal.fire('Error', 'Falta por reelnar los campos', 'info');
    } else if (this.user.password.length <= 4) {
      Swal.fire('info', 'Contraseña pequeña, escriba mas de 4 caracteres', 'info');
    } else if (this.user.usuario.length <= 4) {
      Swal.fire('info', 'Nombre de usuario corto, escriba mas de 4 caracteres', 'info');
    } else if (this.user.nickname.length <= 3) {
      Swal.fire('info', 'Apodo corto, escriba mas de 3 caracteres', 'info');
    } else {
      this.service.crearUsuario(this.user).subscribe(
        {
          next: (resp) => {
            Swal.fire('Creado correctamente', `Nuevo Usuario: ${resp.data.user}`, 'success')
            this.router.navigate(['/articulos']);
          }, error: (error) => {
            Swal.fire('Error', error.error?.message || 'Error desconocido', 'error');
          }
        }
      )
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../models/usuarios/usuarios.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from '../../models/usuarios/usuario.dto';
import Swal from 'sweetalert2';
import { UserAccessDTO } from '../../models/usuarios/usuario-access.dto';

@Component({
  selector: 'app-actualizar-user',
  standalone: false,
  templateUrl: './actualizar-user.component.html',
  styleUrl: './actualizar-user.component.css'
})
export class ActualizarUserComponent implements OnInit {
  id: number;
  user: Usuarios = {
    id: 0,
    user: '',
    nickname: '',
    password: '',
    role: ''
  };
  userU: UserDTO = {
    usuario: '',
    password: '',
    nickname: ''
  };
  userA: UserAccessDTO = {
    username: '',
    password: ''
  };
  formularioActualizacion = false;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerUsuario();
  }

  constructor(private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  obtenerUsuario() {
    this.usuariosService.obtenerUsuarioPorId(this.id)
      .subscribe({
        next: (resp) => {
          this.user = resp.data;
          // Datos para mostrar en el formulario de actualización
          this.userU.usuario = this.user.user;
          // this.userU.nickname = this.user.nickname;

          console.log(`Credenciales cargadas: ${this.userA.username}, ${this.userA.password}`);
        }, error: (error) => {
          console.log(error);
        }
      });
  }

  //Llamar a actualizar usuario
  actualizarUsuario() {
    console.log(`${this.userU.usuario}, ${this.userU.nickname}, ${this.userU.password}`);
    this.usuariosService.actualizarUsuario(this.userU, this.user.id).
      subscribe({
        next: (resp) => {
          Swal.fire(
            'Success',
            `Usuario Actualizado: ${this.userU.usuario}`,
            'success'
          )
          this.router.navigate(['/articulos']);
        },
        error: (error) => {
          Swal.fire(
            'Ocurrio algo mal',
            error,
            'error'
          )
          this.vaciarFormularioActualizaciones();
        }
      })
  }

  //Validar credenciales antes de hacer aparecer la pantalla de modificar datos
  //de usuarios
  validacion() {
    console.log(`${this.userA.username} y ${this.userA.password}`)
    if (!this.userA.username || !this.userA.password) {
      Swal.fire(
        'Notificación',
        'Escriba datos correctos',
        'info'
      )
      this.vaciarCredenciales();
    } else {
      this.usuariosService.iniciarSesion(this.userA).
        subscribe({
          next: (resp) => {
            if (resp.success) {
              //Si las credenciales estan correctas aparecer pantalla de modificación de datos
              this.formularioActualizacion = true;
              Swal.fire(
                'Acceso a la modificación',
                'Puedes modificar tus datos',
                'success'
              )
              this.vaciarCredenciales();
            } else {
              Swal.fire(
                'Notificación',
                'Credenciales incorrectas',
                'info'
              )
              this.vaciarCredenciales();
            }
          },
          error: (error) => {
            Swal.fire(
              'Error',
              `Mensaje: ${error}`,
              'error'
            )
            this.vaciarCredenciales();
          }
        })
    }
  }
  vaciarCredenciales() {
    this.userA.password = '';
    this.userA.username = '';
  }

  vaciarFormularioActualizaciones() {
    this.userU.password = '';
    this.userU.nickname = '';
    this.userU.usuario = '';
  }

}

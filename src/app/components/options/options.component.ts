import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../../models/usuarios/usuarios.model';
import { ArticuloService } from '../../services/articulo.service';
import { ArticulosCategoriaDTO } from '../../models/articulos/articulos-categoria.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-options',
  standalone: false,
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent implements OnInit {
  id: number;
  user: Usuarios;
  articulos: ArticulosCategoriaDTO[];

  constructor(private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private articulosService: ArticuloService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerCredenciales(this.id);
  }

  obtenerCredenciales(id: number) {
    this.usuariosService.obtenerUsuarioPorId(this.id)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          //obtenemos los datos para el usuario
          this.user.id = this.id;
          this.user.usuario = res.data.usuario;
          this.user.nickname = res.data.nickname;
          this.user.role = res.data.role;
        }, error: (error) => {
          console.log(error);
        }
      });
  }

  obtenerArticulos(id: number) {
    this.articulosService.listarArticulosPorUsuarioId(this.id)
      .subscribe({
        next: (resp) => {
          this.articulos = resp.data;
        }
        , error: (error) => {
          console.log(`Error: ${error}`)
        }
      })
  }

  eliminarUsuario() {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Seguro que quiere darse de baja? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed)
        this.usuariosService.borrarUsuario(this.id).
          subscribe({
            next: (resp) => {
              if (resp.success) {
                Swal.fire(
                  'Eliminado',
                  `${resp.message}`,
                  'success'
                )
              }
            }, error: (error) => {
              Swal.fire(
                'Error',
                'No se pudo eliminar',
                'error'
              );
              console.log(`Error al eliminar: ${error}`);
            }
          })
    })
  }

  actualizarUsuario() {
    this.router.navigate(['/actualizar', this.id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../../models/usuarios/usuarios.model';
import { ArticuloService } from '../../services/articulo.service';
import { ArticulosCategoriaDTO } from '../../models/articulos/articulos-categoria.dto';
import Swal from 'sweetalert2';
import { ArticulosUsuariosDTO } from '../../models/articulos/articulos-usuarios.dto';
import { VentasService } from '../../services/ventas.service';
import { TotalDTO } from '../../models/ventas/total.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-options',
  standalone: false,
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent implements OnInit {
  id: number;
  user: Usuarios = {
    id: 0,
    user: '',
    nickname: '',
    role: '',
    password: ''
  };
  articulos: ArticulosCategoriaDTO[] = [];
  articulosV: ArticulosUsuariosDTO[] = [];
  total: number = 0;

  constructor(private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private articulosService: ArticuloService,
    private router: Router,
    private ventasService: VentasService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerCredenciales();
    this.obtenerArticulos();
    this.obtenerArticulosVendidos();
    this.obtenerGanancias();
  }

  obtenerCredenciales() {
    this.usuariosService.obtenerUsuarioPorId(this.id)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          //obtenemos los datos para el usuario
          this.user = res.data;
          this.user.id = this.id;
        }, error: (error) => {
          console.log(error);
        }
      });
  }

  obtenerArticulos() {
    this.articulosService.listarArticulosPorUsuarioId(this.id)
      .subscribe({
        next: (resp) => {
          this.articulos = resp.data;
        }
        , error: (error) => {
          console.log(`Error: ${error.error.message}`)
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
                this.cerrarSesion();
                Swal.fire(
                  'Eliminado',
                  `${resp.message}`,
                  'success'
                )
              }
            }, error: (error) => {
              Swal.fire(
                'Error',
                `${error.error?.message}` || 'Error desconocido',
                'error'
              );
              console.log(`Error al eliminar: ${error}`);
            }
          })
    })
  }

  actualizarUsuario() {
    this.router.navigate(['/actualizarUsuario', this.id]);
  }

  modificarArticulo(id: number) {
    this.router.navigate(['/actualizarArticulo', id]);
  }

  eliminarArticulo(id: number) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Seguro que quiere eliminar:  ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articulosService.eliminarArticulo(id).subscribe({
          next: (resp) => {
            Swal.fire('Borrado', `${resp.message}`, 'success');
            this.obtenerArticulos();
            this.obtenerArticulosVendidos();
            this.obtenerGanancias();
          }, error: (error) => {
            Swal.fire('Error', `${error.error.message}` || 'Error desconocido', 'error');
            return;
          }
        })
      }
    })
  }

  obtenerArticulosVendidos() {
    this.articulosService.obtenerArticulosVendidosPorUsuario(this.id)
      .subscribe({
        next: (resp) => {
          this.articulosV = resp.data;
          console.log(this.articulosV);
        }, error: (error) => {
          console.log(`Error: ${error.error.message}`);
        }
      })
  }

  obtenerGanancias() {
    this.ventasService.obtenerGananciasUsuario(this.id).
      subscribe({
        next: (resp) => {
          this.total = resp.data.total;
          console.log(this.total);
        }, error: (error) => {
          console.log(`Error: ${error.error.message}`)
        }
      })
  }
  cerrarSesion() {
    this.auth.logout();
    //Debe redirigir a otra ruta que no sea options al cerrar sesion
    this.router.navigate(['/articulos'], { replaceUrl: true });
  }
}

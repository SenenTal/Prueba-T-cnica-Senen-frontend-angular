import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { ArticulosCategoriaDTO } from '../../models/articulos/articulos-categoria.dto';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { VentasService } from '../../services/ventas.service';
import { ArticulosDTO } from '../../models/articulos/articulos.dto';

@Component({
  selector: 'app-articles-detail',
  standalone: false,
  templateUrl: './articles-detail.component.html',
  styleUrl: './articles-detail.component.css'
})
export class ArticlesDetailComponent implements OnInit {
  idUsuario!: number;
  sesion: boolean = false;
  idArticulo!: number;
  articulo: ArticulosDTO = {
    idArticulo: 0,
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    estadoArticulo: false,
    ubicacion: '',
    fechaPublicacion: new Date,
    imagen: '',
    idUsuario: 0
  }
  articulosUsuario: ArticulosDTO[] = [];
  imageUrl = 'http://localhost:8001/imagenes'
  imagen: string = '';
  esPropietario: boolean = false;

  constructor(private route: ActivatedRoute,
    private articuloService: ArticuloService,
    private ventasService: VentasService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.sesion$.subscribe(valor => {
      this.sesion = valor;
    })
    this.idUsuario = this.auth.getUserId();
    this.route.paramMap.subscribe(params => {
      this.idArticulo = Number(params.get('id'));
      this.llamarArticulo();
    });
  }
  //Llamar el articulo por Id
  llamarArticulo() {
    this.articuloService.articuloPorId(this.idArticulo).subscribe({
      next: (resp) => {
        this.articulo = resp.data;
        this.imagen = `${this.imageUrl}/${this.articulo.imagen}`
        //Comparar si el id del usuario es igual a id_usuario de articulo
        this.esPropietario = this.articulo.idUsuario === this.idUsuario;
        console.log(`${this.articulo}`);
      }, error: (error) => {
        Swal.fire(
          'Fallo de conexión',
          `${error.error?.message}` || 'Error desconocido',
          'error'
        )
      }
    })
  }
  //Para comprar producto
  comprarProducto() {
    if (!this.idUsuario) {
      Swal.fire('Error', 'Debes iniciar sesión', 'error');
      return;
    } else {
      this.ventasService.crearVenta(this.idArticulo).subscribe(
        {
          next: (resp) => {
            Swal.fire('Compra hecha', `Usted compró: ${resp.data.titulo}`, 'success')
            this.router.navigate(['/articulos']);
          },
          error: (resp) => {
            Swal.fire('Fallo en la venta', `${resp.error.message}` || 'Error desconocido', 'error');
          }
        }
      )
    }
  }

  //Función para validar si el usuario le pertenece la publicación
  //Para deshabilitar el botón comprar (no puede comprar su propio articulo)
  // verificarUsuario() {
  //   if(this.idUsuario === this.articulo.idUsuario){
  //     this.esPropietario = true
  //   }
  // }
}

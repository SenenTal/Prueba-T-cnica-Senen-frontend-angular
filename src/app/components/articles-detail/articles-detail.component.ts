import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { ArticulosCategoriaDTO } from '../../models/articulos/articulos-categoria.dto';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-articles-detail',
  standalone: false,
  templateUrl: './articles-detail.component.html',
  styleUrl: './articles-detail.component.css'
})
export class ArticlesDetailComponent implements OnInit {
  sesion: boolean = false;
  idArticulo!: number;
  articulos: ArticulosCategoriaDTO = {
    idArticulo: 0,
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    estadoArticulo: false,
    ubicacion: '',
    fechaPublicacion: new Date,
    imagen: ''
  }
  imageUrl = 'http://localhost:8001/imagenes'
  imagen: string = '';

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
    this.route.paramMap.subscribe(params => {
      this.idArticulo = Number(params.get('id'));
      this.llamarArticulo();
    });
  }
  //Llamar el articulo por Id
  llamarArticulo() {
    this.articuloService.articuloPorId(this.idArticulo).subscribe({
      next: (resp) => {
        this.articulos = resp.data;
        this.imagen = `${this.imageUrl}/${this.articulos.imagen}`
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
    const idUsuario = this.auth.getUserId();
    if (!idUsuario) {
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
}

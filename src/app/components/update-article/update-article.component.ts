import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { ArticulosCategoriaDTO } from '../../models/articulos/articulos-categoria.dto';
import Swal from 'sweetalert2';
import { ModificarArticulo1DTO } from '../../models/articulos/modificar-articulo1.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-article',
  standalone: false,
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.css'
})
export class UpdateArticleComponent implements OnInit {

  imagenFile!: File;
  imagenPreview: string = '';
  idArticulo!: number;
  idUsuario!: number;
  imageUrl = 'http://localhost:8001/imagenes/'

  articulo: ArticulosCategoriaDTO = {
    idArticulo: 0,
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    estadoArticulo: false,
    ubicacion: '',
    fechaPublicacion: new Date(),
    imagen: ''
  };


  articuloU: ModificarArticulo1DTO = {
    idUsuario: 0,
    titulo: '',
    estadoArticulo: false,
    precio: 0,
    categoria: '',
    ubicacion: '',
    descripcion: ''
  };


  constructor(
    private route: ActivatedRoute,
    private service: ArticuloService,
    private router: Router,
    private auth: AuthService
  ) { }


  ngOnInit(): void {
    // Obtener usuario logueado
    const userId = this.auth.getUserId();
    if (userId == null) {
      this.router.navigate(['/login']);
      return;
    }

    this.idUsuario = userId;

    // Obtener id del articulo
    this.route.paramMap.subscribe(params => {

      this.idArticulo = Number(
        params.get('id')
      );

      this.obtenerArticulo();
    });
  }



  obtenerArticulo() {
    this.service.articuloPorId(this.idArticulo)
      .subscribe({
        next: (resp) => {
          this.articulo = resp.data;
          //imagen actual del backend
          this.imagenPreview = this.articulo.imagen;
          console.log(this.articulo.imagen);

          // llenar formulario de actualización
          this.articuloU = {

            idUsuario: this.idUsuario,
            titulo: this.articulo.titulo,
            descripcion: this.articulo.descripcion,
            precio: this.articulo.precio,
            categoria: this.articulo.categoria,
            estadoArticulo: this.articulo.estadoArticulo,
            ubicacion: this.articulo.ubicacion
          };
        },
        error: (error) => {
          Swal.fire(
            'Error',
            error.error?.message || 'Error desconocido',
            'error'
          );
        }
      });
  }



  actualizarArticulo() {
    // asegurar usuario
    this.articuloU.idUsuario = this.idUsuario;
    if (!this.imagenFile) {
      this.service.actualizarArticulo1(
        this.idArticulo,
        this.articuloU
      )
        .subscribe({
          next: (resp) => {
            Swal.fire(
              'Modificado',
              resp.data.titulo,
              'success'
            );
            this.irAOpciones();
          }
        });
    } else {
      this.service.actualizarArticulo2(
        this.idArticulo,
        this.articuloU,
        this.imagenFile
      )
        .subscribe({
          next: (resp) => {
            Swal.fire(
              'Modificación con éxito',
              `Se modificó: ${resp.data.titulo}`,
              'success'
            );
            this.irAOpciones();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              error.error?.message || 'Error desconocido',
              'error'
            );
          }
        });
    }
  }
  irAOpciones() {
    this.router.navigate([
      '/opciones',
      this.idUsuario
    ]);
  }

  onFileSelected(event: any) {
    const archivo= event.target.files[0];
    if(!archivo){
      return;
    }
    this.imagenFile = archivo;
    const reader = new FileReader();
    reader.onload=()=>{
      this.imagenPreview = reader.result as string;
    };
    reader.readAsDataURL(archivo);
  }

}
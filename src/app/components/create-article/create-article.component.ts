import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InsertarArticuloDTO } from '../../models/articulos/insertar-articulos.dto';

@Component({
  selector: 'app-create-article',
  standalone: false,
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent implements OnInit {

  id!: number;
  imagen!: File;
  imagenPreview: string = '';
  articulo: InsertarArticuloDTO = {
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    ubicacion: '',
    idUsuario: 0
  }

  constructor(private service: ArticuloService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.articulo.idUsuario = this.id;
  }
  onFileSelected(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.imagen = archivo;

      //mostrar preview y la imagenB
      this.imagenPreview = URL.createObjectURL(archivo);
    }
  }

  crearArticulo() {
    console.log(`${this.articulo.titulo}, ${this.articulo.descripcion}, ${this.articulo.categoria},
      ${this.articulo.precio}, ${this.articulo.ubicacion}, ${this.articulo.idUsuario}`)
    if (!this.articulo.titulo || !this.articulo.descripcion || !this.articulo.categoria
      || !this.articulo.precio || !this.articulo.ubicacion
    ) {
      Swal.fire('Llenar información', 'Falta llenar datos en el formulario', 'info');
      return;
    } else if (!this.imagen) {
      Swal.fire('Falta imagen', 'Se necesita una imagen de tu articulo', 'info');
    }
    else if (this.articulo.precio <= 0) {
      Swal.fire('Precio inválido', 'Escriba un precio de verdad', 'info')
    } else {
      this.articulo.idUsuario = this.id;
      this.service.crearArticulo(this.articulo, this.imagen)
        .subscribe({
          next: (resp) => {

            Swal.fire(
              'Nuevo Articulo',
              `Artículo creado correctamente: ${resp.data.titulo}`,
              'success'
            );
            console.log(`Titulo: ${resp.data.titulo} del articulo creado`)
            this.router.navigate(['/articulos']);
          }, error: (error) => {
            Swal.fire(
              'Falla', `${error.error?.message}` || 'Error desconocido', 'error'
            )
          }
        })
    }
  }
}

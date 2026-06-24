import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { ArticulosCategoriaDTO } from '../../models/articulos/articulos-categoria.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articles',
  standalone: false,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {

  articulos: ArticulosCategoriaDTO[] = [];
  disponible: string[] = [];
  imageUrl = "http://localhost:8001/imagenes/";
  filtroTitulo: string = '';
  filtroCategoria: string = '';

  constructor(private service: ArticuloService,
    private router: Router) { }

  ngOnInit() {
    this.listarArticulos();
  }

  listarArticulos() {
    this.service.listarArticulos().subscribe({
      next: (respuesta) => {
        this.articulos = respuesta.data;
        console.log(this.articulos);
      },
      error: (error) => {
        console.log("Error al obtener articulos ", error.error.message);
      }
    });
  }

  verArticulo(id: number) {
    console.log(`ìd del articulo: ${id}`)
    this.router.navigate(['/articulos', id])
  }

  listarPorTitulo() {
    //Filtrar los espacios en titulo
    if(this.filtroTitulo.trim() === ''){
    this.listarArticulos(); // volver a todos
    return;
  }
    this.service.buscarArticulosPorTitulo(this.filtroTitulo).subscribe({
      next: (resp) => {
        this.articulos = resp.data;
        console.log(this.articulos);
      }, error: (error) => {
        Swal.fire('Error', `${error.error.message}` || 'Error Desconocido', 'error')
      }
    })
  }

  listarPorCategoria() {
    if(this.filtroCategoria === ''){
    this.listarArticulos();
    return;
  }
    this.service.buscarArticulosPorCategoria(this.filtroCategoria).subscribe({
      next: (resp) => {
        this.articulos = resp.data;
        console.log(this.articulos);
      }, error: (error) => {
        Swal.fire('Error', `${error.error.message}` || 'Error Desconocido', 'error')
      }
    })
  }

}

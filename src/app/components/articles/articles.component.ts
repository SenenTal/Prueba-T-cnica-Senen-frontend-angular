import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { ArticulosCategoriaDTO } from '../../models/articulos/articulos-categoria.dto';

@Component({
  selector: 'app-articles',
  standalone: false,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{
  
  articulos: ArticulosCategoriaDTO[] = [];
  disponible: string[] = [];
  
  constructor(private service:ArticuloService){}
  
  ngOnInit(){
    this.listarArticulos();
  }

  listarArticulos(){
    this.service.listarArticulos().subscribe({
      next:(respuesta)=>{
        this.articulos = respuesta.data;
        console.log(this.articulos);
        let i = 0;
        for(i=0;i<this.articulos.length;i++){
          if(this.articulos[i].estadoArticulo === true){
            this.disponible[i] = 'Disponible';
          }else {
            this.disponible[i] = 'No disponible';
          }
        }
      },
      error:(error)=>{
        console.log("Error al obtener articulos ",error);
      }
    });
  }

  disponiblidad(){

  }

}

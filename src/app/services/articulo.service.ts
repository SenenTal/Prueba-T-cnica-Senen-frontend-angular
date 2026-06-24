import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulos } from '../models/articulos/articulos.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response/apiResponse';
import { ArticulosCategoriaDTO } from '../models/articulos/articulos-categoria.dto';
import { ModificarArticulo1DTO } from '../models/articulos/modificar-articulo1.dto';
import { ModificarArticulo2DTO } from '../models/articulos/modificar-articulo2.dto';
import { InsertarArticuloDTO } from '../models/articulos/insertar-articulos.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private url = "http://localhost:8001/articulos"

  constructor(private http: HttpClient) { }

  //Nota hay que tener ojo, no regresan los datos esperados de Articulos
  //En spring boot regresan un objetoDTO según la petición
  listarArticulos(): Observable<ApiResponse<ArticulosCategoriaDTO[]>> {

    return this.http.get<ApiResponse<ArticulosCategoriaDTO[]>>(
      `${this.url}`
    );

  }

  crearArticulo(articulo: InsertarArticuloDTO, imagen: File): Observable<ApiResponse<Articulos>> {
    const formData = new FormData();

    formData.append("newArticulo", new Blob([JSON.stringify(articulo)],{
      type: "application/json"
    }));
    formData.append("imagen", imagen);
    return this.http.post<ApiResponse<Articulos>>(
      this.url,
      formData
    );
  }

  eliminarArticulo(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      `${this.url}/${id}`
    )
  }

  listarArticulosPorUsuarioId(id: number): Observable<ApiResponse<ArticulosCategoriaDTO[]>> {
    return this.http.get<ApiResponse<ArticulosCategoriaDTO[]>>(`${this.url}/usuario/${id}`);
  }

  listarArticulosDeUsuarios(): Observable<ApiResponse<ArticulosCategoriaDTO[]>> {
    return this.http.get<ApiResponse<ArticulosCategoriaDTO[]>>(`${this.url}/usuarios`);
  }

  articuloPorId(id: number): Observable<ApiResponse<ArticulosCategoriaDTO>> {
    return this.http.get<ApiResponse<ArticulosCategoriaDTO>>(`${this.url}/${id}`);
  }

  buscarArticulosPorTitulo(titulo: string): Observable<ApiResponse<ArticulosCategoriaDTO[]>>{
    return this.http.get<ApiResponse<ArticulosCategoriaDTO[]>>(`${this.url}/titulo/${titulo}`);
  }

  buscarArticulosPorCategoria(categoria: string): Observable<ApiResponse<ArticulosCategoriaDTO[]>>{
    return this.http.get<ApiResponse<ArticulosCategoriaDTO[]>>(`${this.url}/categoria/${categoria}`);
  }

  actualizarArticulo1(id:number, articulo: ModificarArticulo1DTO): Observable<ApiResponse<ArticulosCategoriaDTO>>{
    return this.http.put<ApiResponse<ArticulosCategoriaDTO>>(`${this.url}/1/${id}`, articulo);
  }

  actualizarArticulo2(id:number, articulo: ModificarArticulo1DTO, imagen: File): Observable<ApiResponse<ArticulosCategoriaDTO>>{
    const formData = new FormData();
    //DTO como JSON dentro de FormData
    formData.append('articulo', new Blob([JSON.stringify(articulo)], {type: 'application/json'}));
    //archivo
    formData.append('imagen', imagen);
    return this.http.put<ApiResponse<ArticulosCategoriaDTO>>(`${this.url}/2/${id}`, formData);
  }

  obtenerArticulosDelUsuario(id: number): Observable<ApiResponse<ArticulosCategoriaDTO[]>>{
    return this.http.get<ApiResponse<ArticulosCategoriaDTO[]>>(`${this.url}/usuario/${id}`);
  }
}

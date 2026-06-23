import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response/apiResponse';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios/usuarios.model';
import { UserDTO } from '../models/usuarios/usuario.dto';
import { UserAccessDTO } from '../models/usuarios/usuario-access.dto';
import { UserAdminDTO } from '../models/usuarios/usuarios-admin.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:8003/usuarios'

  constructor(private http: HttpClient) { }

  listarUsuarios():Observable<ApiResponse<Usuarios[]>>{
    return this.http.get<ApiResponse<Usuarios[]>>(`${this.url}`);
  }

  obtenerUsuarioPorId(id:number):Observable<ApiResponse<Usuarios>>{
    return this.http.get<ApiResponse<Usuarios>>(`${this.url}/${id}`);
  }

  crearUsuario(newUsuario:UserDTO):Observable<ApiResponse<Usuarios>>{
    return this.http.post<ApiResponse<Usuarios>>(`${this.url}`, newUsuario);
  }

  borrarUsuario(id: number):Observable<ApiResponse<null>>{
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`);
  }

  iniciarSesion(usuario: UserAccessDTO):Observable<ApiResponse<Usuarios>>{
    return this.http.post<ApiResponse<Usuarios>>(`${this.url}/sesion`, usuario);
  }

  hacerAdmin(name: String):Observable<ApiResponse<UserAdminDTO>>{
    return this.http.put<ApiResponse<UserAdminDTO>>(`${this.url}/admin/${name}`, null);
  }

  hacerUser(name: String):Observable<ApiResponse<UserAdminDTO>>{
    return this.http.put<ApiResponse<UserAdminDTO>>(`${this.url}/user/${name}`, null);
  }

  actualizarUsuario(usuario: UserDTO):Observable<ApiResponse<Usuarios>>{
    return this.http.put<ApiResponse<Usuarios>>(`${this.url}`, usuario);
  }
}

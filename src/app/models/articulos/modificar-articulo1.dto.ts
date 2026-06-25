export interface ModificarArticulo1DTO{
    idUsuario: number;
    titulo: string;
    descripcion: string;
    precio: number;
    categoria: string;
    estadoArticulo: boolean | null;
    ubicacion: string;
}
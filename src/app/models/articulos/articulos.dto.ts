export interface ArticulosDTO{
    idArticulo: number;
    titulo: string;
    descripcion: string;
    precio: number;
    categoria: string;
    estadoArticulo: boolean;
    ubicacion: string;
    fechaPublicacion: Date;
    imagen: string;
    idUsuario: number;
}
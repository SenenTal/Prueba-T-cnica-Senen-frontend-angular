export interface ArticulosCategoriaDTO{
    idArticulo: number;
    titulo: string;
    descripcion: string;
    precio: number;
    categoria: string;
    estadoArticulo: boolean;
    ubicacion: string;
    fechaPublicacion: Date;
    imagen: string;
}
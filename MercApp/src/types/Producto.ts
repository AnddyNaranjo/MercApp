export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  stock?: number;
  descripcion?: string;
 imagen: string | File | null;
   categoriaID?: string;
}


export interface ProductoCreate {
  nombre: string;
  precio: number;
  stock?: number;
  descripcion?: string;
  imagen?: File | null;
  categoriaID?: string;
}

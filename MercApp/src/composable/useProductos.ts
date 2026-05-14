/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Producto, ProductoCreate } from '@/types/Producto';
import axios from 'axios';

const API = 'http://localhost:3000/api/productos';

export const useProductos = () => {

  const getProductos = async () => {
    const res = await axios.get<Producto[]>(API);
    return res.data;
  };



const crearProducto = async (producto: ProductoCreate) => {
  console.log('Producto a crear:', producto); // para verificar el contenido
  const formData = new FormData();

  formData.append('nombre', producto.nombre);
  formData.append('precio', producto.precio.toString());
  formData.append('stock', producto.stock?.toString() || '');
  formData.append('descripcion', producto.descripcion || '');
  formData.append('categoriaID', producto.categoriaID || '');

  if (producto.imagen) {
    formData.append('imagen', producto.imagen);
  }

  const res = await axios.post(API, formData);
  console.log('Respuesta del servidor:', res.data); // para verificar la respuesta
  return res.data;
};


const actualizarProducto = async (producto: any) => {
  console.log("Producto a actualizar:", producto);
  console.log("ID a actualizar:", producto._id);
  
  const formData = new FormData();
  
  formData.append('nombre', producto.nombre);
  formData.append('precio', producto.precio.toString());
  formData.append('stock', producto.stock.toString());
  formData.append('descripcion', producto.descripcion);
  formData.append('categoriaID', producto.categoriaID);
  
  if (producto.imagen instanceof File) {
    formData.append('imagen', producto.imagen);
  }
  
  console.log("ID:", producto._id);
  
  const res = await axios.put(
    `${API}/${producto._id}`,
    formData
  );
  
  // Verificar la respuesta
  console.log('Respuesta del servidor:', res.data);
  
  return res.data;
};

const eliminarProducto = async (id: string) => {
  console.log("ID a eliminar:", id);
  const res = await axios.delete(`${API}/${id}`);
  console.log('Respuesta del servidor:', res.data);
  return res.data;
}


  return {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
  };
};
import type { Categoria, CategoriaCreate } from "@/types/Categoria";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/categorias`;

export const useCategorias = () => {

  const getCategorias = async () => {
    const res = await axios.get<Categoria[]>(API);
    return res.data;
  };

  
const crearCategoria = async (categoria: CategoriaCreate) => {
  console.log("Categoría a crear:", categoria);

  const res = await axios.post(API, {
    nombre: categoria.nombre
  });

  console.log("Respuesta:", res.data);
  return res.data;
};


  return {
    getCategorias,
    crearCategoria
  };
};

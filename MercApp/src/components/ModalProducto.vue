<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductos } from '@/composable/useProductos';
import type { ProductoCreate } from '@/types/Producto';
import { useCategorias } from '@/composable/useCategorias';
import type { Categoria } from '@/types/Categoria';

const emit = defineEmits(['productoCreado']);

const { crearProducto: apiCrearProducto } = useProductos();

const categorias = ref<Categoria[]>([]);
const { getCategorias } = useCategorias();

onMounted(async () => {
  categorias.value = await getCategorias();
});



const producto = ref<ProductoCreate>({
  nombre: '',
  precio: 0,
  stock: 0,
  descripcion: '',
  imagen: null,
  categoriaID: ''
});


// capturar imagen
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFileChange = (e: any) => {
  producto.value.imagen = e.target.files[0];
};

// guardar producto
const crearProducto = async () => {
  await apiCrearProducto(producto.value);

  emit('productoCreado');

  // limpiar
  producto.value = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: null,
    categoriaID: ''
  };



  // cerrar modal
  const modal = document.getElementById('modalProducto');
  const backdrop = document.querySelector('.modal-backdrop');

  modal?.classList.remove('show');
  backdrop?.remove();
};
</script>

<template>
  <div class="modal fade" id="modalProducto" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Nuevo Producto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="crearProducto">

            <input v-model="producto.nombre" placeholder="Nombre" class="form-control mb-2" />
            <input v-model="producto.precio" type="number" placeholder="Precio" class="form-control mb-2" />
            <input v-model="producto.stock" type="number" placeholder="Stock" class="form-control mb-2" />
            <input v-model="producto.descripcion" placeholder="Descripción" class="form-control mb-2" />
            <select v-model="producto.categoriaID" class="form-control mb-2">
              <option value="">Seleccionar Categoría</option>
              <option v-for="categoria in categorias" :key="categoria._id" :value="categoria._id">
                {{ categoria.nombre }}
              </option>
            </select>

            <input type="file" class="form-control mb-2" @change="onFileChange" />

            <button class="btn btn-success">Guardar</button>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>
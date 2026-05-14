<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useProductos } from '../composable/useProductos';
import type { Producto } from '@/types/Producto';
const emit = defineEmits(['editarProducto', 'eliminarProducto']);

// recibes el buscar
const props = defineProps<{
  buscar: string;
  recargar: number;
}>();


watch(() => props.recargar, async () => {
  productos.value = await getProductos();
});


const productos = ref<Producto[]>([]);
const { getProductos } = useProductos();

onMounted(async () => {
  productos.value = await getProductos();
});

// FILTRO EN TIEMPO REAL
const productosFiltrados = computed(() => {
  return productos.value.filter(p =>
    p.nombre.toLowerCase().includes(props.buscar.toLowerCase())
  );
});



const cargarProducto = (prod: Producto) => {
  emit('editarProducto', prod);
};

const eliminarProducto = (prod: Producto) => {
  console.log('Producto a eliminar:', prod._id);
  if (confirm(`¿Estás seguro de eliminar "${prod.nombre}"?`)) {
    emit('eliminarProducto', prod._id); // Emitir solo el ID
  }
};

</script>


<template>
  <div class="card">
     <div class="card-header text-center">
   <h5>Productos</h5> 
  </div>
    <div>
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Nombre del Producto</th>
      <th scope="col">Precio</th>
      <th scope="col">Stock</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Imagen</th>
      <th scope="col">Categoria</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="p in productosFiltrados" :key="p._id">
      <th scope="row" >{{ p.nombre}}</th>
      <td>{{ p.precio }}</td>
      <td>{{ p.stock }}</td>
      <td>{{ p.descripcion }}</td>
      <td>
        <img
  :src="`http://localhost:3000${p.imagen}`" 
  width="80"
  style="border-radius: 5px;"
/>
      </td>
      <td>{{ p.categoriaID?.nombre }}</td>
      <td>
      <div class="d-flex">
<button class="btn btn-warning me-2" @click="cargarProducto(p)">
  Editar
</button>
<button class="btn btn-danger" @click="eliminarProducto(p)">
  Eliminar
</button>
      </div>
      </td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
 
  
</template>
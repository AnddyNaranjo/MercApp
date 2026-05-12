<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useProductos } from '../composable/useProductos';
import type { Producto } from '@/types/Producto';
const emit = defineEmits(['editarProducto']);

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
  console.log('Producto a editar:', prod.categoriaID);
  emit('editarProducto', prod);
};

</script>


<template>
  <div>
    <h2>Productos</h2>
    <div>
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Nombre del Producto</th>
      <th scope="col">Precio</th>
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
        <button class="btn btn-warning" @click="cargarProducto(p)">
  Editar
</button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
</template>
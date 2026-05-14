<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">
  <div class="col" v-for="p in productosFiltrados" :key="p._id">
  <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
  <div><strong>{{ p.nombre }}</strong> </div>

  <small style="color: red; font-size: 12px;">
    Stock: {{ p.stock }}
  </small>
</div>
  <img class="card-img-top" 
  :src="`http://localhost:3000${p.imagen}`" 
  width="80"
  style="border-radius: 5px;"
/>
  <div class="card-body">
    <h5 class="card-title">Tiene un precio de: {{ p.precio }} $</h5>
    <p class="card-text">{{ p.descripcion }}</p>
<p class="card-text">{{ p.categoriaID?.nombre }}</p>
  </div>
     <div class="card-footer">
      <small class="text-body-secondary">Agregar al Carrito</small>
    </div>
</div>
  </div>
</div>

</template>


<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useProductos } from '../composable/useProductos';
import type { Producto } from '@/types/Producto';

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

</script>
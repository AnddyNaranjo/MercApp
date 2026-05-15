<template>

 <!-- BOTON CARRITO -->
  <div class="d-flex justify-content-end mb-3">

    <button
      class="btn btn-dark position-relative"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasCarrito"
    >
      🛒 Carrito

      <!-- BADGE -->
      <span
        v-if="cantidadCarrito > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {{ cantidadCarrito }}
      </span>

    </button>

  </div>



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
      <small class="text-body-secondary">
        <button type="button" class="btn btn-warning"   @click="agregarAlCarrito(p)"
>Agregar al Carrito</button>
      </small>
    </div>
</div>
  </div>
</div>

 <!-- OFFCANVAS -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasCarrito"
  >
    <div class="offcanvas-header">
      <h5>Carrito</h5>

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>

    <div class="offcanvas-body">

      <div
        v-for="item in carrito"
        :key="item.producto._id"
        class="mb-3 border-bottom pb-2"
      >
        <strong>{{ item.producto.nombre }}</strong>

        <div>
          Cantidad: {{ item.cantidad }}
        </div>

        <div>
          $ {{ item.producto.precio }}
        </div>

      </div>

      <h5 class="text-end">
  Total: $ {{ totalPagar.toFixed(2) }}
</h5>

      <div class="d-grid gap-2 mt-4">

  <button
    class="btn btn-success"
    @click="comprar"
  >
    Comprar
  </button>

  <button
    class="btn btn-danger"
    @click="cancelarCompra"
  >
    Cancelar Compra
  </button>

</div>

    </div>

  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useProductos } from '../composable/useProductos';
import type { Producto } from '@/types/Producto';
import { useCarrito } from '@/composable/useCarrito'

// recibes el buscar
const props = defineProps<{
  buscar: string;
  recargar: number;
}>();

const {
  carrito,
  agregarAlCarrito,
  cantidadCarrito,
  comprar,
  cancelarCompra,
  totalPagar
} = useCarrito()

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
  const texto = props.buscar.toLowerCase();

  return productos.value.filter(p =>
    p.nombre?.toLowerCase().includes(texto) ||
    p.descripcion?.toLowerCase().includes(texto) ||
    p.categoriaID?.nombre?.toLowerCase().includes(texto)
  );
});

</script>
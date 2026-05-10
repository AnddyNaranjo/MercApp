<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">MercApp</a>
      <form class="d-flex">
        <div>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalCategoria"
          >
            Nuevo Categoría
          </button>
        </div>
        <div>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalProducto"
          >
            Nuevo Producto
          </button>
        </div>
        <div role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="buscar"
          />
        </div>
      </form>
    </div>
  </nav>
  
  <ModalProducto @productoCreado="emit('productoCreado')" />
  <ModalCategoria @categoriaCreada="emit('categoriaCreada')" />

</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ModalProducto from './ModalProducto.vue';
import ModalCategoria from './ModalCategoria.vue';
const emit = defineEmits([
  'productoCreado',
  'categoriaCreada',
  'update:buscar'
]);
const buscar = ref("");

// cada vez que cambia, lo manda al padre
watch(buscar, (value) => {
  emit("update:buscar", value);
});




</script>

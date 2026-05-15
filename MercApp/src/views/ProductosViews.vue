
<script setup lang="ts">
import TablaProductos from '@/components/TablaProductos.vue'

defineProps(['buscar', 'recargar'])
defineEmits(['editarProducto', 'eliminarProducto', 'nuevoProducto'])
</script>

<template>
    <div class="container-fluid mt-4">
    <!-- BOTÓN AQUÍ -->
     <div class="d-flex justify-content-end">
    <button
      class="btn btn-primary mb-3"
     @click="$emit('nuevoProducto')"
    >
      <i class="bi bi-plus-circle me-1"></i>

      Agregar Nuevo Producto
    </button>
</div>
  <TablaProductos
    :buscar="buscar"
    :recargar="recargar"
    @editarProducto="$emit('editarProducto', $event)"
    @eliminarProducto="$emit('eliminarProducto', $event)"
  />
  </div>
</template>

<template>
    <div class="container-fluid mt-4">
  <CardProductos :recargar="recargar" :buscar="buscar" />
  </div>
</template>

<script setup lang="ts">
import CardProductos from '@/components/CardProductos.vue'

defineProps(['buscar', 'recargar'])
</script>

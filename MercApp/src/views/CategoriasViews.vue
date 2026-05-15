<template>
  <MostrarCategorias 
    :recargar="recargar" 
    @categoriaCreada="$emit('categoriaCreada')" 
  />
</template>

<script setup lang="ts">
import MostrarCategorias from '@/components/MostrarCategorias.vue'

defineProps(['recargar'])
defineEmits(['categoriaCreada'])
</script>
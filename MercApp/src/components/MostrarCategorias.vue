<template>
  <div class="row mt-3">

<div class="container col-auto">
<ul class="list-group">
  <li class="list-group-item active" aria-current="true">Todas las categorias existentes</li>
  <li v-for="categoria in categorias" :key="categoria._id" :value="categoria._id" class="list-group-item">{{ categoria.nombre }}</li>
</ul>
</div>

<div class="container col-auto">
<div class="card">
  <form @submit.prevent="crearCategoria">
    <h5 class="card-header">Crear Nueva Categoria</h5>
    <div class="card-body">
          
            <input v-model="categoria.nombre" placeholder="Nombre" class="form-control mb-2" />
        
    </div>
  <div class="card-footer text-body-secondary"> 
    <button class="btn btn-success">Guardar Nueva Categoria</button>
  </div>
  </form>
</div>
</div>
</div>
</template>

<script setup lang="ts">
import { useCategorias } from '@/composable/useCategorias';
import type { Categoria, CategoriaCreate } from '@/types/Categoria';
import { onMounted, ref } from 'vue';

const categorias = ref<Categoria[]>([]);
const { getCategorias } = useCategorias();

onMounted(async () => {
  categorias.value = await getCategorias();
});


const emit = defineEmits(['categoriaCreada']);

const { crearCategoria: apiCrearCategoria } = useCategorias();


const categoria = ref<CategoriaCreate>({
  nombre: ''
});

const crearCategoria = async () => {
  await apiCrearCategoria(categoria.value);

  emit('categoriaCreada');

  // limpiar
  categoria.value = {
    nombre: ''
  };
}

</script>
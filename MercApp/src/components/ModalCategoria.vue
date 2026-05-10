<template>
  <div class="modal fade" id="modalCategoria" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Nueva Categoría</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="crearCategoria">

            <input v-model="categoria.nombre" placeholder="Nombre" class="form-control mb-2" />
        
            <button class="btn btn-success">Guardar</button>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCategorias } from '@/composable/useCategorias';
import type { CategoriaCreate } from '@/types/Categoria';

const emit = defineEmits(['categoriaCreada']);

const { crearCategoria: apiCrearCategoria } = useCategorias();


const categoria = ref<CategoriaCreate>({
  nombre: ''
});



// guardar categoria
const crearCategoria = async () => {
  await apiCrearCategoria(categoria.value);

  emit('categoriaCreada');

  // limpiar
  categoria.value = {
    nombre: ''
  };

  // cerrar modal
  const modal = document.getElementById('modalCategoria');
  const backdrop = document.querySelector('.modal-backdrop');

  modal?.classList.remove('show');
  backdrop?.remove();
}
</script>
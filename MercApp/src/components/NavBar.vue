<template>
  <div class="container-fluid">
    <!-- Tabs de navegación -->
    <div class="mt-3">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
         <div class="container-fluid">

  <div class="nav nav-tabs" id="nav-tab" role="tablist">
               <a class="navbar-brand">MercApp</a>


          
<router-link to="/home" class="nav-link" active-class="active">
  Home
</router-link>

<router-link to="/productos" class="nav-link" active-class="active">
  Tabla de Productos
</router-link>

<router-link to="/categorias" class="nav-link" active-class="active">
  Categorías
</router-link>

</div>
            
          <div class="input-group" style="max-width: 300px;">
          <span class="input-group-text">🔍</span>
          <input 
            v-model="buscar" 
            type="search" 
            class="form-control" 
            placeholder="Buscar producto..."
            data-bs-toggle="popover" 
  data-bs-trigger="focus" 
  data-bs-content="Se puede buscar por nombre, categoría o descripción del producto"
          >
        </div>
        
        
      </div>
      </nav>
    </div>
    
 

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as bootstrap from 'bootstrap';
const emit = defineEmits(['update:buscar']);

const buscar = ref("");

// Emitir búsqueda al padre
watch(buscar, (value) => {
  emit("update:buscar", value);
});

onMounted(() => {
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map(el => new bootstrap.Popover(el))
})
</script>


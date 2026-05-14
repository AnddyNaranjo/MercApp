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
          >
        </div>
        
      </div>
      </nav>
    </div>
    
 

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(['update:buscar']);

const buscar = ref("");

// Emitir búsqueda al padre
watch(buscar, (value) => {
  emit("update:buscar", value);
});
</script>


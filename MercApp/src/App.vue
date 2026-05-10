
<template>
  <div class="container-fluid">
<div>
<NavBar v-model:buscar="buscar" @productoCreado="onProductoCreado" />
</div>
<div>
<h1>Tabla de Productos</h1>
<TablaProductos  :buscar="buscar" :recargar="recargar"/>
</div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TablaProductos from './components/TablaProductos.vue'
import NavBar from './components/NavBar.vue'

const recargar = ref(0);
const buscar = ref('');

const onProductoCreado = () => {
  recargar.value++;
};

</script>



<style scoped>
.saludo {
  max-width: 300px;
  margin: 2rem auto;
  text-align: center;
}
input {
 margin-top: 1rem;
 padding: 0.5rem;
 font-size: 1rem;
}
</style>

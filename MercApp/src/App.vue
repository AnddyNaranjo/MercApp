<template>
  <div>
    <NavBar @update:buscar="actualizarBusqueda" />

    <!-- AQUÍ se renderizan las páginas -->
    <router-view 
      :buscar="buscar" 
      :recargar="recargar"
      @editarProducto="abrirEditar"
      @eliminarProducto="manejarProductoEliminado"
      @categoriaCreada="onCategoriaCreada"
     @nuevoProducto="modalRef.abrirModal()"
    />

    <ModalProducto 
      ref="modalRef" 
      @productoCreado="onProductoCreado"
    />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ModalProducto from './components/ModalProducto.vue'
import { useProductos } from '@/composable/useProductos'


const recargar = ref(0);
const buscar = ref('');
const modalRef = ref();

const { eliminarProducto: apiEliminarProducto } = useProductos();

const actualizarBusqueda = (valor: string) => {
  buscar.value = valor;
};

const onProductoCreado = () => {
  recargar.value++;
};

const onCategoriaCreada = () => {
  recargar.value++;
};


const abrirEditar = (prod: any) => {
  if (modalRef.value) {
    modalRef.value.cargarProducto(prod);
  }
};


const manejarProductoEliminado = async (productoId: string) => {
  try {
    await apiEliminarProducto(productoId);
    recargar.value++;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    alert('Error al eliminar el producto');
  }
};
</script>
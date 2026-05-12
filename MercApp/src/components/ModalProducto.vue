<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { useProductos } from '@/composable/useProductos';
import { useCategorias } from '@/composable/useCategorias';
import type { Categoria } from '@/types/Categoria';
import { Modal } from 'bootstrap';
import type { Producto, ProductoCreate } from '@/types/Producto';

const emit = defineEmits(['productoCreado']);
const { crearProducto: apiCrearProducto, actualizarProducto } = useProductos();

const modo = ref<'crear' | 'editar'>('crear');
const modalInstance = ref<Modal | null>(null);
const modalElement = ref<HTMLElement | null>(null);

// Agregar una variable para guardar el ID del producto a editar
const productoId = ref<string | null>(null);

const categorias = ref<Categoria[]>([]);
const { getCategorias } = useCategorias();

onMounted(async () => {
  categorias.value = await getCategorias();
  
  if (modalElement.value) {
    modalInstance.value = new Modal(modalElement.value);
  }
});

const producto = ref<Producto | ProductoCreate>({
  nombre: '',
  precio: 0,
  stock: 0,
  descripcion: '',
  imagen: null,
  categoriaID: ''
});

const onFileChange = (e: any) => {
  producto.value.imagen = e.target.files[0];
};

const crearProducto = async () => {
  console.log('Guardando - Modo actual:', modo.value);
  console.log('Datos:', producto.value);

  if (modo.value === 'crear') {
    console.log('CREANDO');
    await apiCrearProducto(producto.value as ProductoCreate);
  } else {
    console.log('ACTUALIZANDO');
    //Crear objeto con el ID para actualizar
    const productoActualizar: Producto = {
      ...producto.value,
      _id: productoId.value || '' // Agregar el ID
    } as Producto;
    
    console.log('Producto a actualizar:', productoActualizar);
    await actualizarProducto(productoActualizar);
  }
  
  emit('productoCreado');

  // Limpiar
  producto.value = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: null,
    categoriaID: ''
  };
  
  productoId.value = null; // Limpiar ID
  modo.value = 'crear';

  if (modalInstance.value) {
    modalInstance.value.hide();
  }
  
  setTimeout(() => {
    const backdrop = document.querySelector('.modal-backdrop');
    backdrop?.remove();
  }, 150);
};

const cargarProducto = async (prod: Producto) => {
  console.log('1. Iniciando cargarProducto con:', prod);
  
  // Cerrar el modal si está abierto
  if (modalInstance.value) {
    modalInstance.value.hide();
  }
  
  // Esperar a que se cierre
  await nextTick();
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // ✅ Guardar el ID del producto
  productoId.value = prod._id || null;
  console.log('ID guardado:', productoId.value);
  
  // Cambiar el modo
  modo.value = 'editar';
  console.log('2. Modo cambiado a:', modo.value);
  
  // Cargar los datos
  producto.value = {
    nombre: prod.nombre,
    precio: prod.precio,
    stock: prod.stock,
    descripcion: prod.descripcion,
    categoriaID: prod.categoriaID?._id || prod.categoriaID,
    imagen: null
  };
  
  console.log('3. Producto cargado:', producto.value);
  console.log('4. Modo actual:', modo.value);
  
  // Esperar a que Vue actualice el DOM
  await nextTick();
  
  // Mostrar el modal
  if (modalElement.value && modalInstance.value) {
    console.log('5. Mostrando modal en modo:', modo.value);
    modalInstance.value.show();
  }
};

defineExpose({
  cargarProducto,
  producto,
  modo
});
</script>

<template>
  <!-- Agregar ref al elemento del modal -->
  <div ref="modalElement" class="modal fade" id="modalProducto" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <!-- Usar una computed o método para forzar la actualización -->
          <h5 class="modal-title">
            {{ modo === 'editar' ? 'Editar Producto' : 'Nuevo Producto' }}
            <!-- Debug -->
            <small style="color: red; font-size: 12px;">[{{ modo }}]</small>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="crearProducto">
            <input v-model="producto.nombre" placeholder="Nombre" class="form-control mb-2" />
            <input v-model="producto.precio" type="number" placeholder="Precio" class="form-control mb-2" />
            <input v-model="producto.stock" type="number" placeholder="Stock" class="form-control mb-2" />
            <input v-model="producto.descripcion" placeholder="Descripción" class="form-control mb-2" />
            <select v-model="producto.categoriaID" class="form-control mb-2">
              <option value="">Seleccionar Categoría</option>
              <option v-for="categoria in categorias" :key="categoria._id" :value="categoria._id">
                {{ categoria.nombre }}
              </option>
            </select>

            <input type="file" class="form-control mb-2" @change="onFileChange" />

            <button class="btn btn-success" type="submit">
              {{ modo === 'editar' ? 'Actualizar' : 'Guardar' }}
            </button>
            
            <!-- Debug info -->
            <div style="margin-top: 10px; font-size: 12px; color: gray;">
              Modo actual: {{ modo }}
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
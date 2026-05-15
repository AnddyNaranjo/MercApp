<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductos } from '@/composable/useProductos';
import { useCategorias } from '@/composable/useCategorias';
import type { Categoria } from '@/types/Categoria';
import { Modal } from 'bootstrap';
import type { Producto, ProductoCreate } from '@/types/Producto';

const emit = defineEmits(['productoCreado', 'productoEliminado', 'productoActualizado']);
const { crearProducto: apiCrearProducto, actualizarProducto } = useProductos();

const modo = ref<'crear' | 'editar'>('crear');
const modalInstance = ref<Modal | null>(null);
const modalElement = ref<HTMLElement | null>(null);
const inputFile = ref<HTMLInputElement | null>(null)

// Agregar una variable para guardar el ID del producto a editar
const productoId = ref<string | null>(null);

const categorias = ref<Categoria[]>([]);
const { getCategorias } = useCategorias();

//Validaciones del formulario

const errores = ref({
  nombre: '',
  precio: '',
  stock: '',
  descripcion: '',
  categoriaID: '',
  imagen: ''
});

const validarFormulario = () => {
  errores.value = {
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    categoriaID: '',
    imagen: ''
  };

  let valido = true;

  if (!producto.value.nombre || producto.value.nombre.trim().length < 3) {
    errores.value.nombre = "Mínimo 3 caracteres";
    valido = false;
  }

  const precio = Number(producto.value.precio);
 
if (isNaN(precio) || precio <= 0) {
  errores.value.precio = "El precio debe ser mayor a 0";
  valido = false;
}


  const stock = Number(producto.value.stock);
  console.log("Validando stock:", producto.value.stock, stock);
  if (isNaN(stock) || stock <= 0) {
  errores.value.stock = "El stock debe ser mayor a 0";
  valido = false;
}

  if (!producto.value.descripcion) {
    errores.value.descripcion = "Descripción obligatoria";
    valido = false;
  }

  if (!producto.value.categoriaID) {
    errores.value.categoriaID = "Seleccione categoría";
    valido = false;
  }

  if (modo.value === 'crear' && !producto.value.imagen) {
    errores.value.imagen = "Imagen obligatoria";
    valido = false;
  }

  return valido;
};


onMounted(async () => {
  categorias.value = await getCategorias();

  modalInstance.value = new Modal(modalElement.value as HTMLElement);

  modalElement.value?.addEventListener('hidden.bs.modal', () => {
    limpiarFormulario();
  });
});


const producto = ref<Producto | ProductoCreate>({
  nombre: '',
  precio: 0,
  stock: 0,
  descripcion: '',
  imagen: null as File | null,
  categoriaID: ''
});

const onFileChange = (e: any) => {
  producto.value.imagen = e.target.files[0];
};

const limpiarFormulario = () => {
errores.value = {
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    categoriaID: '',
    imagen: ''
  };

  producto.value = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: null,
    categoriaID: ''
  };

  // limpiar input file
  if (inputFile.value) {
    inputFile.value.value = ''
  }

  productoId.value = null;
  modo.value = 'crear';
};

const crearProducto = async () => {

  if (!validarFormulario()) return;
  console.log("Producto a enviar:", producto.value);

  if (modo.value === 'crear') {
    await apiCrearProducto(producto.value as ProductoCreate);
  } else {
    const productoActualizar: Producto = {
      ...producto.value,
      _id: productoId.value || ''
    } as Producto;

    await actualizarProducto(productoActualizar);
  }

  emit('productoCreado');
  emit('productoActualizado')


  productoId.value = null;
  modo.value = 'crear';

  // Cerrar modal (el listener se encarga de la limpieza)
  if (modalInstance.value) {
    modalInstance.value.hide();
  }
};


const cargarProducto = async (prod: Producto) => {

  // Guardar el ID del producto
  productoId.value = prod._id || null;

  // Cambiar el modo
  modo.value = 'editar';
  // Cargar los datos
  producto.value = {
    nombre: prod.nombre,
    precio: prod.precio,
    stock: prod.stock,
    descripcion: prod.descripcion,
    categoriaID: prod.categoriaID?._id || prod.categoriaID,
    imagen: null
  };


  // Mostrar el modal directamente sin cerrarlo primero
  if (modalElement.value && modalInstance.value) {
    modalInstance.value.show();
  }
};



const abrirModal = () => {
  if (modalInstance.value) {
    modalInstance.value.show();
  }
};



defineExpose({
  cargarProducto,
  abrirModal,
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
            <input v-model="producto.nombre" class="form-control mb-2" :class="{ 'is-invalid': errores.nombre }"
              placeholder="Nombre" />

            <div class="invalid-feedback">
              {{ errores.nombre }}
            </div>
            <input v-model.number="producto.precio" type="number" class="form-control mb-2"
              :class="{ 'is-invalid': errores.precio }" placeholder="Precio" step="0.01"/>

            <div class="invalid-feedback">
              {{ errores.precio }}
            </div>
            <input v-model.number="producto.stock" type="number" class="form-control mb-2"
              :class="{ 'is-invalid': errores.stock }" placeholder="Stock" step="0.01"/>

            <div class="invalid-feedback">
              {{ errores.stock }}
            </div>
            <input v-model="producto.descripcion" placeholder="Descripción" class="form-control mb-2" 
            :class="{ 'is-invalid': errores.descripcion }"/>
            <div class="invalid-feedback">
              {{ errores.descripcion }}
            </div>
            <select v-model="producto.categoriaID" class="form-control mb-2"
              :class="{ 'is-invalid': errores.categoriaID }">
              <option value="">Seleccionar Categoría</option>
              <option v-for="categoria in categorias" :key="categoria._id" :value="categoria._id">
                {{ categoria.nombre }}
              </option>
            </select>

            <div class="invalid-feedback">
              {{ errores.categoriaID }}
            </div>
            <input ref="inputFile" type="file" class="form-control mb-2" @change="onFileChange" :class="{'is-invalid': errores.imagen}"/>

            <div class="invalid-feedback">
              {{ errores.imagen }}
            </div>

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
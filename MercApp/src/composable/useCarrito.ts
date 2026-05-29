import { ref, computed } from 'vue'
import type { Producto } from '@/types/Producto'
import { Offcanvas } from 'bootstrap'
import axios from 'axios'

interface ItemCarrito {
  producto: Producto
  cantidad: number
}

const carrito = ref<ItemCarrito[]>([])
const API = `${import.meta.env.VITE_API_URL}/productos`;

export function useCarrito() {

  const agregarAlCarrito = (producto: Producto) => {

    const item = carrito.value.find(
      i => i.producto._id === producto._id
    )

    // validar stock
    if ((producto.stock || 0) <= 0) return

    if (item) {
      item.cantidad++
    } else {
      carrito.value.push({
        producto,
        cantidad: 1
      })
    }

    // bajar stock temporalmente
    if (producto.stock) {
      producto.stock--
    }
  }

  const cantidadCarrito = computed(() =>
    carrito.value.reduce((acc, item) => acc + item.cantidad, 0)
  )

const totalPagar = computed(() => {

  return carrito.value.reduce((acc, item) => {

    return acc + (
      item.producto.precio * item.cantidad
    )

  }, 0)

})

const comprar = async () => {
console.log('Iniciando compra con carrito:', carrito.value) // para verificar el contenido del carrito
  try {

    for (const item of carrito.value) {

      await axios.patch(

        `${API}/${item.producto._id}/stock`,

        {
          stock: item.producto.stock
        }

      )

    }

    alert('✅ Compra realizada con éxito')

    carrito.value = []

    cerrarOffcanvas()

  } catch (error) {

    console.error(error)

    alert('❌ Error al procesar compra')

  }

}

const cancelarCompra = () => {

  carrito.value.forEach(item => {

    if (item.producto.stock !== undefined) {
      item.producto.stock += item.cantidad
    }

  })

  carrito.value = []

    cerrarOffcanvas()


  alert('❌ Compra cancelada')
}

const cerrarOffcanvas = () => {
  const offcanvasElement = document.getElementById('offcanvasCarrito')

  if (offcanvasElement) {
    const offcanvas =
      Offcanvas.getInstance(offcanvasElement)

    offcanvas?.hide()
  }
}

  return {
    carrito,
  agregarAlCarrito,
  cantidadCarrito,
  comprar,
  cancelarCompra,
  totalPagar
  }
}
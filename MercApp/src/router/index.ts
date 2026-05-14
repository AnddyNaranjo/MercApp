import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Productos from '@/views/Productos.vue'
import Categorias from '@/views/Categorias.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/productos', component: Productos },
  { path: '/categorias', component: Categorias }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

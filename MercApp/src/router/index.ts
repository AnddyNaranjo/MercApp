import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/HomeViews.vue'
import Productos from '@/views/ProductosViews.vue'
import Categorias from '@/views/CategoriasViews.vue'

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

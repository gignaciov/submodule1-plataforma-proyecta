import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Proyectinos from '@/components/pages/Proyectinos'
import Auth from '@/components/pages/Auth'
import Pruebas from '@/components/pages/Pruebas'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Proyectinos',
    component: Proyectinos
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pruebas',
    name: 'Pruebas',
    component: Pruebas
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
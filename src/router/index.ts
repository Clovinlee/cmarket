/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

import EcommercePage from '../pages/Ecommerce/EcommercePage.vue'
import EcommerceLayout from '../layouts/EcommerceLayout.vue'

const routes = [
  { path: '/', component: EcommercePage, name: "home", meta: {layout: EcommerceLayout} },
  { path: '/register', component: () => import('../pages/Auth/Register/RegisterPage.vue'), name: "register", meta: {layout: ""} },
  { path: '/login', component: () => import('../pages/Auth/Login/LoginPage.vue'), name: "login", meta: {layout: ""} },
  { path: '/verifyemail', component: () => import('../pages/Auth/Register/EmailSentPage.vue'), name: "verifyemail", meta: {layout: ""} },
  { path: '/notfound', component: () => import('../pages/NotFoundPage.vue'), name: "notfound", meta: {layout: ""} },
  { path: '/:pathMatch(.*)*', redirect: '/notfound' }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
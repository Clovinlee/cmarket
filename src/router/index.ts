/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createMemoryHistory, createRouter } from 'vue-router'

import EcommercePage from '../pages/EcommercePage.vue'

const routes = [
  { path: '/', component: EcommercePage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
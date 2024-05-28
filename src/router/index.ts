/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

import EcommercePage from '../pages/Ecommerce/EcommercePage.vue';
import EcommerceLayout from '../layouts/EcommerceLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import { RoleEnum } from "./role-enum";
import { roleGuard } from './role-guard';

const routes = [
  { path: '/', component: EcommercePage, name: "home", meta: { layout: EcommerceLayout } },
  { path: '/register', component: () => import('../pages/Auth/Register/RegisterPage.vue'), name: "register", meta: { layout: AuthLayout, role: [RoleEnum.ROLE_GUEST] } },
  { path: '/login', component: () => import('../pages/Auth/Login/LoginPage.vue'), name: "login", meta: { layout: AuthLayout, role: [RoleEnum.ROLE_GUEST] } },
  { path: '/profle', component: () => import('../pages/Profile/ProfilePage.vue'), name: "profile", meta: { layout: "", role: [RoleEnum.ROLE_USER, RoleEnum.ROLE_ADMIN] } },
  { path: '/product', redirect: '/notfound', children: [
    {
      path: ':slug',
      component: () => import('../pages/Ecommerce/ProductDetailPage.vue'),
      name: "productdetail",
      meta: { layout: EcommerceLayout,}
    },
  ]},
  {
    path: '/verify',
    redirect: '/notfound',
    children: [
      {
        path: 'email',
        component: () => import('../pages/Auth/Register/EmailSentPage.vue'),
        name: "verifyemail",
      },
      {
        path: 'email/:uuid',
        component: () => import('../pages/Auth/Register/EmailRegisterPage.vue'),
        name: "verifyemailuuid",
      },
    ]
  },
  { path: '/reset-password', component: () => import('../pages/Auth/ResetPasswordPage.vue'), name: "reset-password", meta: { layout: "" } },
  { path: '/notfound', component: () => import('../pages/NotFoundPage.vue'), name: "notfound", meta: { layout: "" } },
  { path: '/:pathMatch(.*)*', redirect: '/notfound' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Route Guard Middleware
router.beforeEach(async (to, from, next) => {
  await roleGuard(to, from, next);
});

export default router
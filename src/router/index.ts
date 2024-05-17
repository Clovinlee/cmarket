/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

import EcommercePage from '../pages/Ecommerce/EcommercePage.vue'
import EcommerceLayout from '../layouts/EcommerceLayout.vue'
import { AxiosClient } from '../api/AxiosClient'
import { LOGIN_JWT_ENDPOINT } from '../ApiEndpoints'
import { Role } from '../models/Role'

enum RoleEnum {
  ROLE_USER = 'user',
  ROLE_ADMIN = 'admin',
  ROLE_GUEST = 'guest',
}

const routes = [
  { path: '/', component: EcommercePage, name: "home", meta: { layout: EcommerceLayout } },
  { path: '/register', component: () => import('../pages/Auth/Register/RegisterPage.vue'), name: "register", meta: { layout: "", role: [RoleEnum.ROLE_GUEST] } },
  { path: '/login', component: () => import('../pages/Auth/Login/LoginPage.vue'), name: "login", meta: { layout: "", role: [RoleEnum.ROLE_GUEST] } },
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
  if (to.meta.role) {
    let roleAccess: RoleEnum[] = [];
    if(Array.isArray(to.meta.role)){
      roleAccess = to.meta.role;
    }

    let userRole: string | null = null;
    try {
      const response = await AxiosClient.getInstance().post(LOGIN_JWT_ENDPOINT, {}, { withCredentials: true });
      userRole = (response.data.user.role.name as string).toLowerCase();
    } catch (e) {

    }

    if(roleAccess.length == 0){
      next();
    }else{
      if (!userRole) {
        // user not logged in
        if (roleAccess.includes(RoleEnum.ROLE_GUEST)) {
          next();
        } else {
          next({ name: "login" });
        }
      } else {
        // user logged in
        const userRoleEnum: RoleEnum = userRole as RoleEnum; // convert userRole to RoleEnum
        if (roleAccess.includes(userRoleEnum)) { 
          next();
        }else if(roleAccess.includes(RoleEnum.ROLE_GUEST)){
          next({ name: "home" });
        }
      }
    } 
  }

  next();
}
);

export default router
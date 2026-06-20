import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/edit',
      name: 'editProfile',
      component: () => import('../views/EditProfile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/@:username',
      name: 'publicProfile',
      component: () => import('../views/PublicProfile.vue')
    }
  ]
})

export default router

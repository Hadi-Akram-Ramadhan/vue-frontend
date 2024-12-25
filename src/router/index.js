import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/admin',
        name: 'admin',
        component: () =>
            import ('../views/AdminView.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import ('../views/DashboardView.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (to.meta.requiresAuth && !user) {
        next('/login')
    } else if (to.meta.requiresAdmin && user ?.role !== 'admin') {
        next('/dashboard')
    } else {
        next()
    }
})

export default router
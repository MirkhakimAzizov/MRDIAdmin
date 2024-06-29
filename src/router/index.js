import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; // Admin sahifasi komponenti
import Login from '../components/Login.vue'; // Login komponenti

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login' // Root sahifani /login ga yo'naltirish
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true // Autentifikatsiya talab qiladigan yo'l
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Autentifikatsiya talab qiladigan yo'l
    const isAuthenticated = localStorage.getItem('isAdminLoggedIn'); // Autentifikatsiya holatini tekshirish
    if (!isAuthenticated) {
      next('/login'); // Autentifikatsiya bo'lmagan holatda /login ga yo'naltirish
    } else {
      next(); // Yo'lda davom etish
    }
  } else {
    next(); // Autentifikatsiya talab qilinmaydigan yo'l
  }
});

export default router;

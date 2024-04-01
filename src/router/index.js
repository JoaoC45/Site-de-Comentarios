import { createRouter, createWebHistory } from 'vue-router';
import CommentsView from '@/components/CommentsView.vue';
import LoginView from '@/components/LoginView.vue';
import RegisterView from '@/components/RegisterView.vue';
import AddCommentView from '@/components/AddCommentView.vue';
import UserProfile from '@/components/UserProfile.vue';
import Logout from '@/components/Logout.vue';
import { auth } from '@/services/firebase-config';

const routes = [
  {
    path: '/',
    name: 'comments',
    component: CommentsView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/add-comment',
    name: 'addComment',
    component: AddCommentView,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;

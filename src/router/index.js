import { createRouter, createWebHistory } from 'vue-router'
import CommentsView from '@/components/CommentsView.vue'
import LoginView from '@/components/LoginView.vue'
import RegisterView from '@/components/RegisterView.vue'
import AddCommentView from '@/components/AddCommentView.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

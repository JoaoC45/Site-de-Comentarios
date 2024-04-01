<template>
  <div class="home">
    <div v-if="loading">
      Carregando...
    </div>
    <LoginView v-else-if="!user" />
    <div v-else>
      <AddCommentView />
      <CommentsView />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginView from '@/components/LoginView.vue';
import AddCommentView from '@/components/AddCommentView.vue';
import CommentsView from '@/components/CommentsView.vue';

const auth = getAuth();
const user = ref(null);
const loading = ref(true);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    loading.value = false;
  }, (error) => {
    console.error("Erro de autenticação:", error);
    loading.value = false;
  });
});
</script>

<style>
/* Adicione seus estilos aqui */
</style>

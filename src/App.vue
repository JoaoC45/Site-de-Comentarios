<template>
  <div id="app">
    <nav>
      <router-link to="/">Comments</router-link> |
      <router-link v-if="!isAuthenticated" to="/login">Login  |</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Register  |</router-link>
      <router-link to="/add-comment">Add Comment</router-link> |
      <router-link v-if="isAuthenticated" to="/UserProfile">UserProfile  |</router-link>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { auth } from '@/services/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  isAuthenticated.value = !!user;
  console.log('Auth state changed:', user);
});

const logout = async () => {
  await auth.signOut();
  isAuthenticated.value = false;
  router.push('/login');
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

#app {
  text-align: center;
}

nav {
  background-color: #7c7979;
  padding: 10px 0;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  margin: 0 15px;
  font-weight: 500;
}

.nav-link:hover,
.active-link {
  color: #cccccc;
}

main {
  padding: 20px;
}

@media (max-width: 600px) {
  nav {
    font-size: 14px;
  }

  .nav-link {
    margin: 0 10px;
  }
}
</style>

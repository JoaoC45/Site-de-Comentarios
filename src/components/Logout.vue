<template>
    <div class="logout-container">
        <button @click="logout" :disabled="loggingOut">Logout</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/services/firebase-config';
import { useRouter } from 'vue-router';

const router = useRouter();
const loggingOut = ref(false);

const logout = () => {
    loggingOut.value = true;
    auth.signOut().then(() => {
        router.push('/login');
    }).catch((error) => {
        console.error('Erro ao fazer logout:', error);
        loggingOut.value = false;
    });
};
</script>

<style scoped>
.logout-container {
    display: flex;
    justify-content: center;
    padding: 20px;
}

button {
    padding: 10px 20px;
    background-color: #f44336;
    /* Red */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>
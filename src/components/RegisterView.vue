<template>
    <div class="register-container">
        <h1>Registrar</h1>
        <form @submit.prevent="register">
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Senha" required>
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/services/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        router.push('/login'); // Sucesso, redireciona para login
    } catch (error) {
        alert(error.message); // Mostra o erro em um alert
    }
};
</script>

<style>
.register-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input,
button {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>

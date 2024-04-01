<template>
    <div class="login-container">
        <h1>Login</h1>
        <div class="input-group">
            <input v-model="email" type="email" placeholder="Email" />
        </div>
        <div class="input-group">
            <input v-model="password" type="password" placeholder="Password" />
        </div>
        <button @click="login">Login</button>
        <button @click="goToRegister" class="register-btn">Não tem uma conta? Registre-se</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase-config';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert('Logged in successfully!');
    } catch (error) {
        alert(error.message); 
    }
};

const goToRegister = () => {
    router.push({ name: 'register' });
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.input-group {
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.register-btn {
    background-color: #28a745;

}

.register-btn:hover {
    background-color: #218838;
}
</style>
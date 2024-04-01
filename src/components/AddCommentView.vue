<template>
    <div class="comment-form">
        <h2>Adicione seu Comentário</h2>
        <div class="input-group">
            <input v-model="commentText" placeholder="Escreva seu comentário aqui..." />
        </div>
        <div class="input-group">
            <input v-model.number="rating" type="number" placeholder="Classificação" min="1" max="5" />
        </div>
        <button @click="addComment">Adicionar Comentário</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, db } from '@/services/firebase-config';
import { push, ref as dbRef } from 'firebase/database';

const commentText = ref('');
const rating = ref(1); // Valor inicial válido

const addComment = async () => {
    if (!auth.currentUser) {
        alert('Por favor, faça login para adicionar um comentário.');
        return;
    }
    if (!commentText.value.trim() || rating.value < 1 || rating.value > 5) {
        alert("Por favor preencha todos os campos corretamente!");
        return;
    }
    try {
        const newComment = {
            userId: auth.currentUser.uid,
            text: commentText.value,
            rating: rating.value,
            timestamp: Date.now()
        };
        await push(dbRef(db, 'comments'), newComment);
        alert('Comentário adicionado com sucesso!');
        commentText.value = '';
        rating.value = 1;
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        alert('Houve um problema ao adicionar o comentário, tente novamente.');
    }
};
</script>

<style scoped>
.comment-form {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    width: 100%;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
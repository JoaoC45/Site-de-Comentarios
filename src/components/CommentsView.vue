<template>
    <div class="comments-container">
        <h1>Comentários</h1>
        <div class="comment" v-for="comment in comments" :key="comment.id">
            <img :src="comment.userImageUrl" alt="User image" class="user-image">
            <div class="comment-content">
                <h3>{{ comment.userName }}</h3>
                <p class="comment-text">{{ comment.text }}</p>
                <div class="comment-details">
                    <Vue3StarRatings :rating="comment.rating" />
                    <span class="comment-date">{{ formatDate(comment.date) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/services/firebase-config'; // Ajuste o caminho se necessário
import { ref as dbRef, get } from 'firebase/database';
import Vue3StarRatings from 'vue3-star-ratings';

const comments = ref([]);

onMounted(async () => {
    const commentsRef = dbRef(db, 'comments');
    const snapshot = await get(commentsRef);
    if (snapshot.exists()) {
        comments.value = Object.values(snapshot.val());
    } else {
        console.log('No data available');
    }
});

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    // Verifique se a data é válida antes de tentar formatá-la
    if (isNaN(date)) {
        return 'Data inválida';
    }
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
};
</script>

<style scoped>
.comments-container {
    max-width: 768px;
    margin: 20px auto;
    font-family: 'Arial', sans-serif;
}

.comment {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #f3f3f3;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
    border: 2px solid #ccc;
}

.comment-content {
    text-align: left;
    flex: 1;
}

.comment-text {
    margin: 5px 0;
    line-height: 1.4;
    color: #333;
}

.comment-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

.comment-date {
    margin-left: 10px;
    font-size: 0.85em;
    color: #777;
}

.vue3-star-ratings {
    font-size: 1em;
}


.vue3-star-ratings .star {
    cursor: pointer;
    transition: color 0.2s;
}

.vue3-star-ratings .star:not(.active) {
    color: #ccc;
}

.vue3-star-ratings .star.active {
    color: #ffd700;
}
</style>

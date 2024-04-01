<template>
    <div class="comments-container">
        <h1>Comentários</h1>
        <div v-if="averageRating > 0" class="average-rating">
            <Vue3StarRatings :rating="averageRating" :star-size="20" :read-only="true" />
            <span>({{ averageRating.toFixed(1) }} de 5)</span>
        </div>
        <div v-if="loading" class="loading">Carregando...</div>
        <div v-else class="comment" v-for="comment in commentsWithImages" :key="comment.id">
            <img :src="comment.userImageUrl || defaultImage" alt="User image" class="user-image">
            <div class="comment-content">
                <h3>{{ comment.userName }}</h3>
                <p class="comment-text">{{ comment.comment }}</p>
                <div class="comment-details">
                    <Vue3StarRatings :rating="comment.rating" :star-size="20" :read-only="true" />
                    <span class="comment-date">{{ formatDate(comment.timestamp) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '@/services/firebase-config';
import { ref as dbRef, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import Vue3StarRatings from 'vue3-star-ratings';

const defaultImage = new URL('@/assets/Solo Leveling.png', import.meta.url).href;
const commentsWithImages = ref([]);
const loading = ref(true);

const loadImages = async (commentsData) => {
    const storage = getStorage();
    return Promise.all(commentsData.map(async (comment) => {
        if (comment.userId) {
            const imagePath = `profilePhotos/${comment.userId}`;
            const imageRef = storageRef(storage, imagePath);
            try {
                comment.userImageUrl = await getDownloadURL(imageRef);
            } catch (error) {
                comment.userImageUrl = defaultImage;
            }
        } else {
            comment.userImageUrl = defaultImage;
        }
        return comment;
    }));
};

onMounted(async () => {
    const commentsRef = dbRef(db, 'comments');
    loading.value = true;

    try {
        const snapshot = await get(commentsRef);
        if (snapshot.exists()) {
            const commentsData = Object.values(snapshot.val());
            commentsWithImages.value = await loadImages(commentsData);
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error("Error fetching comments:", error);
    } finally {
        loading.value = false;
    }
});

const averageRating = computed(() => {
    const sum = commentsWithImages.value.reduce((acc, comment) => acc + comment.rating, 0);
    return commentsWithImages.value.length ? sum / commentsWithImages.value.length : 0;
});

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return !isNaN(date.getTime())
        ? `${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR')}`
        : 'Data inválida';
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
    width: 20px;
    height: 20px;
}

.vue3-star-ratings .star:not(.active) {
    color: #ccc;
}

.vue3-star-ratings .star.active {
    color: #ffd700;
}

.average-rating {
    font-size: 1rem;
    color: #ffd700;
    margin-bottom: 20px;
}

.loading {
    font-size: 1rem;
    color: #666;
}
</style>
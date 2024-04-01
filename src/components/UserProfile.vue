<template>
    <div class="user-profile">
        <h2>Perfil do Usuário</h2>
        <p>Email: {{ userEmail }}</p>
        <img :src="userPhotoUrl" alt="Foto de perfil" class="profile-photo" />
        <input type="file" @change="onFileChange" accept="image/*">
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/services/firebase-config';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const userEmail = ref('');
const userPhotoUrl = ref(''); // Corrigido o nome da variável

onMounted(() => {
    if (auth.currentUser) {
        userEmail.value = auth.currentUser.email;
        loadProfilePhoto();
    }
});

const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) { // Verifica se um arquivo foi selecionado
        await uploadProfilePhoto(file);
    }
};

const loadProfilePhoto = async () => {
    const photoPath = `profilePhotos/${auth.currentUser.uid}`; // Corrigido para usar backticks
    const storage = getStorage();
    try {
        const url = await getDownloadURL(storageRef(storage, photoPath));
        userPhotoUrl.value = url;
    } catch (error) {
        console.log('Foto de perfil não encontrada', error);
        userPhotoUrl.value = ''; // Opção para resetar ou definir uma imagem padrão
    }
};

const uploadProfilePhoto = async (file) => {
    const storage = getStorage();
    const storageReference = storageRef(storage, `profilePhotos/${auth.currentUser.uid}`); // Corrigido para usar backticks

    try {
        await uploadBytes(storageReference, file);
        console.log('Foto de perfil atualizada com sucesso');
        await loadProfilePhoto();
    } catch (error) {
        console.error('Erro ao fazer upload da foto de perfil:', error);
    }
};
</script>

<style scoped>
.profile-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 20px;
    object-fit: cover;
}
</style>
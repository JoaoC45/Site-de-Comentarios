import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "@/services/firebase-config"; // Importe a configuração do Firebase

// Função para fazer o upload da foto de perfil
async function uploadProfilePhoto(file) {
    const storage = getStorage();
    const fileRef = storageRef(storage, `profilePhotos/${auth.currentUser.uid}`);

    try {
        await uploadBytes(fileRef, file);
        alert("Foto de perfil atualizada com sucesso.");
    } catch (error) {
        console.error("Erro ao fazer upload da foto de perfil:", error);
    }
}

// Função para recuperar a URL da foto de perfil
async function getProfilePhotoUrl() {
    const storage = getStorage();
    const fileRef = storageRef(storage, `profilePhotos/${auth.currentUser.uid}`);

    try {
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (error) {
        console.error("Erro ao recuperar a URL da foto de perfil:", error);
        return null;
    }
}

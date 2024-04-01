import { auth } from '../firebase-config';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';

const database = getDatabase();

export const addComment = async (commentText, rating) => {
  if (!auth.currentUser) {
    alert('Usuário não autenticado!');
    return;
  }
  const commentRef = dbRef(database, 'comments');
  const newCommentRef = push(commentRef);
  await set(newCommentRef, {
    user: auth.currentUser.uid,
    comment: commentText,
    rating: rating,
    timestamp: Date.now()
  });
  alert('Comentário adicionado com sucesso!');
};

import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../app/firebase';

const UseGetCategory = async (genre: string) => {
    const gamesRef = collection(db, 'Game');
    const q = query(gamesRef, where('장르', '==', genre));

    const querySnapshot = await getDocs(q);

    const genreGames = {};
    querySnapshot.forEach((doc) => {
        genreGames[genre] = genreGames[genre] || [];
        genreGames[genre].push(doc.data());
    });

    return genreGames;
};

export default UseGetCategory;

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../app/firebase';

interface GenreGames {
    [genre: string]: any[];
}

const UseGetCategory = async (genre: string): Promise<GenreGames> => {
    const gamesRef = collection(db, 'Game');
    const q = query(gamesRef, where('장르', '==', genre));

    const querySnapshot = await getDocs(q);

    const genreGames: GenreGames = {};
    querySnapshot.forEach((doc) => {
        genreGames[genre] = genreGames[genre] || [];
        genreGames[genre].push(doc.data());
    });

    return genreGames;
};

export default UseGetCategory;

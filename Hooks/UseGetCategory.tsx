import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../app/firebase';

interface GenreGames {
    [genre: string]: any[]; // 현재 any 타입으로 지정되어 있습니다. 실제 데이터 타입에 맞게 수정하세요.
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

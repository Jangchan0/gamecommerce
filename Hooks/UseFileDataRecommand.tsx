import { useEffect, useState } from 'react';
// Import necessary functions from the Firebase SDK
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { db, storage } from '../app/firebase';

const UseFileDataRecommand = (genre: string) => {
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                // Firestore에서 Game 컬렉션에서 genre과 일치하는 게임 정보를 가져오는 로직
                const gameQuery = collection(db, 'Game');
                const gameDocs = await getDocs(gameQuery);

                const matchingGames = gameDocs.docs.filter((doc) => doc.data().장르 === genre);

                if (matchingGames.length > 0) {
                    const gameId = matchingGames[0].gameId;

                    const gameDocRef = doc(db, 'Game', gameId);
                    const gameSnapshot = await getDoc(gameDocRef);
                    const gameData = gameSnapshot.data();

                    // FireStorage에서 thumbnail 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
                    const thumbnailRef = storageRef(storage, 'thumbnails/' + gameId);
                    const thumbnailURL = await getDownloadURL(thumbnailRef);

                    // FireStorage에서 video 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
                    const videoRef = storageRef(storage, 'video/' + gameId);
                    const videoURL = await getDownloadURL(videoRef);

                    // 가져온 데이터를 state에 저장
                    setFileData({
                        gameData,
                        thumbnailURL,
                        videoURL,
                    });
                }
            } catch (error) {
                console.error('Error fetching file data:', error);
            }
        };

        fetchFileData();
    }, [genre]);

    return fileData;
};

export default UseFileDataRecommand;

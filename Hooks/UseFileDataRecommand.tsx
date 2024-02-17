import { useEffect, useState } from 'react';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { db, storage } from '../app/firebase';

const UseFileDataRecommand = async (genre) => {
    try {
        // Firestore에서 Game 컬렉션에서 genre과 일치하는 게임 정보를 가져오는 로직
        const gameQuery = collection(db, 'Game');
        const gameDocs = await getDocs(gameQuery);

        const matchingGames = gameDocs.docs.filter((doc) => doc.data().장르 === genre);

        if (matchingGames.length > 0) {
            // Take the first 4 matching games
            const top4MatchingGames = matchingGames.slice(0, 4);

            const recommendedProducts = await Promise.all(
                top4MatchingGames.map(async (gameDoc) => {
                    const gameId = gameDoc.id;
                    const gameSnapshot = await getDoc(doc(db, 'Game', gameId));
                    const gameData = gameSnapshot.data();

                    // FireStorage에서 thumbnail 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
                    const thumbnailRef = storageRef(storage, 'thumbnails/' + gameId);
                    const thumbnailURL = await getDownloadURL(thumbnailRef);

                    // FireStorage에서 video 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
                    const videoRef = storageRef(storage, 'video/' + gameId);
                    const videoURL = await getDownloadURL(videoRef);

                    return {
                        gameData,
                        thumbnailURL,
                        videoURL,
                    };
                })
            );

            return recommendedProducts;
        }

        return [];
    } catch (error) {
        console.error('Error fetching recommended file data:', error);
        return [];
    }
};

export default UseFileDataRecommand;

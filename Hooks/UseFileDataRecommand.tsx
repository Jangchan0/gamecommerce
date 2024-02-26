import { useEffect, useState } from 'react';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { db, storage } from '../app/firebase';

const UseFileDataRecommand = async (genre: string | null) => {
    try {
        const gameQuery = collection(db, 'Game');
        const gameDocs = await getDocs(gameQuery);

        const matchingGames = gameDocs.docs.filter((doc) => doc.data().장르 === genre);

        if (matchingGames.length > 0) {
            const top4MatchingGames = matchingGames.slice(0, 4);

            const recommendedProducts = await Promise.all(
                top4MatchingGames.map(async (gameDoc) => {
                    const gameId = gameDoc.id;
                    const gameSnapshot = await getDoc(doc(db, 'Game', gameId));
                    const gameData = gameSnapshot.data();

                    const thumbnailRef = storageRef(storage, 'thumbnails/' + gameId);
                    const thumbnailURL = await getDownloadURL(thumbnailRef);

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

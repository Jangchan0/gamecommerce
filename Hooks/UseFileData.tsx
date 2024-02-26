import { useEffect, useState } from 'react';
// Import necessary functions from the Firebase SDK
import { getDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { db, storage } from '../app/firebase';

const UseFileData = (fileName: string) => {
    const [fileData, setFileData] = useState<any>(null);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                // Firestore에서 Game 컬렉션에서 fileName과 일치하는 게임 정보를 가져오는 로직
                const gameDocRef = doc(db, 'Game', fileName);
                const gameSnapshot = await getDoc(gameDocRef);
                const gameData = gameSnapshot.data();

                // FireStorage에서 thumbnail 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
                const thumbnailRef = storageRef(storage, 'thumbnails/' + fileName);
                const thumbnailURL = await getDownloadURL(thumbnailRef);

                // FireStorage에서 video 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
                const videoRef = storageRef(storage, 'video/' + fileName);
                const videoURL = await getDownloadURL(videoRef);

                // 가져온 데이터를 state에 저장
                setFileData({
                    gameData,
                    thumbnailURL,
                    videoURL,
                });
            } catch (error) {
                console.error('Error fetching file data:', error);
            }
        };

        fetchFileData();
    }, [fileName]);

    return fileData;
};

export default UseFileData;

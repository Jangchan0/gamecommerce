import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { db, storage } from '../app/firebase';

const UseFileData = (fileName: string) => {
    const [fileData, setFileData] = useState<any>(null);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const gameDocRef = doc(db, 'Game', fileName);
                const gameSnapshot = await getDoc(gameDocRef);
                const gameData = gameSnapshot.data();

                const thumbnailRef = storageRef(storage, 'thumbnails/' + fileName);
                const thumbnailURL = await getDownloadURL(thumbnailRef);

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

import { useEffect, useState } from 'react';
import { db, storage } from '../app/firebase';

const useFileData = (fileName) => {
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        const fetchFileData = async () => {
            // Firestore에서 Game 컬렉션에서 fileName과 일치하는 게임 정보를 가져오는 로직
            const gameRef = db.collection('Game').doc(fileName);
            const gameSnapshot = await gameRef.get();
            const gameData = gameSnapshot.data();

            // FireStorage에서 thumbnail 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
            const thumbnailRef = storage.ref().child('thumbnail/' + fileName);
            const thumbnailURL = await thumbnailRef.getDownloadURL();

            // FireStorage에서 video 컬렉션에서 fileName과 일치하는 파일 가져오는 로직
            const videoRef = storage.ref().child('video/' + fileName);
            const videoURL = await videoRef.getDownloadURL();

            // 가져온 데이터를 state에 저장
            setFileData({
                gameData,
                thumbnailURL,
                videoURL,
            });
        };

        fetchFileData();
    }, [fileName]);

    return fileData;
};

export default useFileData;

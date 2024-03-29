'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import UseGetUserUid from '@/Hooks/UseGetUserUid';
import { db, storage } from '../firebase';
import { deleteObject, ref } from 'firebase/storage';
import { deleteDoc, query, collection, where, getDocs } from 'firebase/firestore';

const ProductBox = (props) => {
    const router = useRouter();
    const { videoInfo, onDelete } = props;
    const userUid = UseGetUserUid();

    const moveRevisePage = () => {
        if (userUid !== videoInfo.uploadUserUid) {
            alert('영상을 업로드한 유저와 계정정보가 일치하지않습니다.');
            router.push('/');
            return;
        }

        router.push(`/revise/${videoInfo.gameId}`);
    };

    const deleteVideo = async () => {
        const gameId = videoInfo.gameId;
        const desertVideoPath = `video/${gameId}`;
        const desertThumbPath = `thumbnails/${gameId}`;

        try {
            const q = query(collection(db, 'Game'), where('gameId', '==', gameId));
            const querySnapshot = await getDocs(q);

            // Firestore에서 문서 삭제
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                console.log('Document successfully deleted!');
            });

            // Storage에서 파일 삭제
            await Promise.all([
                deleteObject(ref(storage, desertVideoPath)),
                deleteObject(ref(storage, desertThumbPath)),
            ]);
            alert('삭제완료!');
            onDelete(gameId);
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    // 문서 삭제     storage thumbnail, video 삭제

    return (
        <div className="flex mb-3 p-4 bg-slate-200 ">
            <div className="w-[250px] h-[150px] mr-5">
                <Image
                    src={videoInfo.thumbnail}
                    alt="썸네일"
                    width={300}
                    height={300}
                    priority
                    className="w-full h-full object-contain rounded-md"
                />
            </div>
            <div className="flex flex-col gap-2 bg-slate-300 w-[300px]">
                <h2 className="text-xl bolder">{videoInfo.게임명}</h2>
                <p className="text-sm">{videoInfo.장르}</p>
                <p>게임소개: {videoInfo.게임소개}</p>
                <p>재고수량: {videoInfo.재고수량}</p>
            </div>
            <div className="flex flex-col mx-auto">
                <button className="buttonCustom" onClick={moveRevisePage}>
                    수정
                </button>
                <button className="buttonCustom" onClick={deleteVideo}>
                    삭제
                </button>
            </div>
        </div>
    );
};

export default ProductBox;

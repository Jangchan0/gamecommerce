'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import ComponentTitle from '@/components/ComponentTitle';
import UseAuthVerification from 'Hooks/UseAuthVerification';
import Image from 'next/image';
import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';

const initialVideoInfo = {
    price: 0,
    thumbnail: '',
    uploadUser: '',
    videoFile: '',
    gameId: '',
    게임명: '',
    게임소개: '',
    장르: '',
};

const videoInfoDefaultValue = {
    게임명: '',
    게임소개: '',
    장르: '',
    price: 0,
    재고수량: 0,
};

const ReviseVideoInfo = () => {
    const router = useRouter();
    const videoQuery = usePathname();
    const modifiedVideoId = decodeURIComponent(videoQuery)?.replace(/^.*\/revise\//, '');

    UseAuthVerification();

    const [user, setUser] = useState(null);

    const uid = user?.uid;

    const reviseVideo = async (videoInfo, thumbnailPaths, uid) => {
        const videoCollectionRef = collection(db, 'Game');
        const q = query(videoCollectionRef, where('gameId', '==', videoInfo.gameId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;

            const deleteDocRef = doc(videoCollectionRef, `${uid}_${videoInfo.게임명}`);
            await deleteDoc(deleteDocRef);

            const docRef = doc(videoCollectionRef, `${uid}_${reviseDetailInfo.게임명}`);

            const updatedData = {
                ...videoInfo,
                ...reviseDetailInfo,
                thumbnail: isImageUpdated ? thumbnailPaths[0] : thumbnails,
                timestamp: serverTimestamp(),
                gameId: `${uid}_${reviseDetailInfo.게임명}`,
            };

            try {
                await setDoc(docRef, updatedData, { merge: true });

                /////// 수정 삭제 해야하는 부분!!! ///////

                alert('업데이트 성공!');

                return router.push('/mypage');
            } catch (error) {
                console.error('Error updating video document:', error);
                return null; // Return null or any other value to indicate failure
            }
        } else {
            console.error('No document found with the given timestamp');
            return null;
        }
    };

    const [thumbnails, setThumbnails] = useState([]);
    const [videoImg, setVideoImg] = useState([]);
    const [isImageUpdated, setIsImageUpdated] = useState(false);

    const handleThumbnailChange = (event) => {
        let newThumbnails = thumbnails;
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            newThumbnails = { url };
            setVideoImg(newThumbnails); // 인풋에 보여질 사진
            setThumbnails(file); // 전송할 파일 담기
            setIsImageUpdated(true); // 이미지가 업데이트되었음을 표시
        }
    };

    const [videoInfo, setVideoInfo] = useState(initialVideoInfo);
    const [reviseDetailInfo, setReviseDetailInfo] = useState(videoInfoDefaultValue);
    const [videoFile, setVideoFile] = useState<Blob | Uint8Array | ArrayBuffer>();

    const extractNecessaryInfo = (sourceInfo) => {
        const { 게임명, 장르, 게임소개, 재고수량, price } = sourceInfo;
        return { 게임명, 장르, 게임소개, 재고수량, price };
    };

    const handleInputChange = (key: string, value: string | number | boolean) => {
        setReviseDetailInfo((prevVideoInfo) => ({
            ...prevVideoInfo,
            [key]: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoCollectionRef = collection(db, 'Game');
                const q = query(videoCollectionRef, where('gameId', '==', modifiedVideoId));
                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs[0].data();
                setVideoInfo(data);

                const extractedInfo = extractNecessaryInfo(data);
                setReviseDetailInfo(extractedInfo);
            } catch (error) {
                console.error('Error getting document:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const oldVideoStorageRef = ref(storage, `video/${uid}_${videoInfo.게임명}`);

        await deleteObject(oldVideoStorageRef);
        const oldThumbnailStorageRef = ref(storage, `thumbnails/${uid}_${videoInfo.게임명}`);
        await deleteObject(oldThumbnailStorageRef);

        const thumbnailStorageRef = ref(storage, `thumbnails/${uid}_${reviseDetailInfo.게임명}`);
        const videotorageRef = ref(storage, `video/${uid}_${reviseDetailInfo.게임명}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        try {
            const snapshot = await uploadBytes(thumbnailStorageRef, thumbnails, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const videonap = await uploadBytes(videotorageRef, videoFile as Blob | Uint8Array | ArrayBuffer);
            const videoDownloadURL = await getDownloadURL(videonap.ref);

            // 게임 데이터 저장
            await reviseVideo(videoInfo, [downloadURL], uid);

            // Use gameId here
        } catch (error) {
            console.error('Error uploading thumbnails or video file:', error);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        setThumbnails(videoInfo.thumbnail);
        setVideoFile(videoInfo.videoFile);
        return () => unsubscribe();
    }, [videoInfo]);

    return (
        <>
            <div className="flex flex-col w-full mx-12">
                <ComponentTitle title="영상 수정" justify="start" />
                <div className="flex justify-between">
                    <div className="flex flex-col bg-gray-200 p-4 rounded-md">
                        <label htmlFor="videoUpload" className="mb-2 font-bold">
                            Upload GameVideo:
                        </label>
                        <div className="border p-2 rounded-md bg-white">
                            <p>파일선택을 안할시 기존 영상파일로 유지됩니다</p>
                            <input type="file" defaultValue={videoFile} />
                        </div>

                        <div className="photoThumbnail flex flex-col w-[50vw] mt-4 space-y-4">
                            <label
                                htmlFor={`thumbnail`}
                                className="border p-16 rounded-md h-[500px] bg-white cursor-pointer hover:border-blue-500"
                            >
                                <Image
                                    src={isImageUpdated ? videoImg.url : videoInfo.thumbnail}
                                    alt="썸네일"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover rounded-md"
                                />

                                <input
                                    type="file"
                                    id={`thumbnail`}
                                    className="hidden"
                                    onChange={(e) => handleThumbnailChange(e)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="VideoInfo bg-slate-300 w-[400px]">
                        {/* Video information form */}
                        <form onSubmit={handleSubmit} className="w-[300px] mx-auto pt-10 ">
                            {Object.entries(reviseDetailInfo).map(([key, value]) => (
                                <div key={key} className="mb-4 ">
                                    <label className="mr-2 block">{key}</label>
                                    {key === '게임소개' ? (
                                        <textarea
                                            value={value as string}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-[300px] h-[100px] rounded-sm"
                                            style={{ resize: 'none' }}
                                        />
                                    ) : key === '장르' ? (
                                        <select
                                            value={value as string}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-[300px] rounded-sm outline-none "
                                        >
                                            <option value="" disabled>
                                                --장르를 선택해주세요--
                                            </option>
                                            <option value="액션">액션</option>
                                            <option value="어드벤처">어드벤처</option>
                                            <option value="캐주얼">캐주얼</option>
                                            <option value="인디">인디</option>
                                            <option value="대규모">대규모</option>
                                            <option value="멀티 플레이어">멀티 플레이어</option>
                                            <option value="레이싱">레이싱</option>
                                            <option value="시뮬레이션">시뮬레이션</option>
                                            <option value="RPG">RPG</option>
                                            <option value="스포츠">스포츠</option>
                                            <option value="전략">전략</option>
                                            <option value="기타">기타</option>
                                        </select>
                                    ) : (
                                        // Default text input
                                        <input
                                            type="text"
                                            value={value as string}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-[300px] rounded-sm"
                                        />
                                    )}
                                </div>
                            ))}
                            <button type="submit" className="w-[200px] h-[50px] bg-slate-500 rounded-md mt-10">
                                판매글 수정
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
};

export default ReviseVideoInfo;

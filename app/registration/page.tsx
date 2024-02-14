'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ComponentTitle from '@/components/ComponentTitle';
import UseAuthVerification from 'Hooks/UseAuthVerification';
import Image from 'next/image';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import uploadImg from '@/public/uploadImg.png';

const Registration = () => {
    const router = useRouter();
    UseAuthVerification();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const uid = user?.uid;

    const addVideo = async (gameInfo, thumbnailPaths, videoFileURL, uid) => {
        const gameId = `${uid}_${gameInfo.게임명}`;
        const videoCollectionRef = doc(collection(db, 'Game'), gameId);

        try {
            await setDoc(videoCollectionRef, {
                ...gameInfo,
                thumbnail: thumbnailPaths[0], // 첫 번째 썸네일을 메인 썸네일로 설정
                videoFile: videoFileURL, // 게임 파일 URL 저장
                timestamp: serverTimestamp(),
                gameId: gameId,
                uploadUser: uid,
                downloadTime: 0,
            });
            return uid;
        } catch (error) {
            console.error('Error adding video document:', error);
            return null; // Return null or any other value to indicate failure
        }
    };
    const [videoFile, setVideoFile] = useState<Blob | Uint8Array | ArrayBuffer>();
    const [thumbnails, setThumbnails] = useState([null]);
    const [videoImg, setVideoImg] = useState([]);

    const handleThumbnailChange = (event) => {
        let newThumbnails = thumbnails;
        const file = event.target.files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            newThumbnails = { url };
            setVideoImg(newThumbnails);
            setThumbnails(file);
        }
    };

    const handleVideoFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const initialVideoInfo = {
        게임명: '',
        장르: '',
        게임소개: '',
        price: 0,
        재고수량: 0,
    };

    const [gameInfo, setVideoInfo] = useState(initialVideoInfo);

    const handleInputChange = (key: string, value: string | number | boolean) => {
        setVideoInfo((prevVideoInfo) => ({
            ...prevVideoInfo,
            [key]: value,
        }));
    };
    const isAllPropertiesFilled = (gameInfo) => {
        return Object.values(gameInfo).every((value) => value !== '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAllPropertiesFilled(gameInfo)) {
            alert('모든 정보를 작성해주세요');
            return;
        }

        // Check if both video file and thumbnail are selected
        if (!videoFile || !thumbnails) {
            alert('영상 파일과 썸네일을 선택해주세요');
            return;
        }

        // 썸네일 업로드
        const thumbnailStorageRef = ref(storage, `thumbnails/${uid}_${gameInfo.게임명}`);
        const videotorageRef = ref(storage, `video/${uid}_${gameInfo.게임명}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        try {
            const snapshot = await uploadBytes(thumbnailStorageRef, thumbnails, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const videonap = await uploadBytes(videotorageRef, videoFile as Blob | Uint8Array | ArrayBuffer);
            const videoDownloadURL = await getDownloadURL(videonap.ref);

            // 영상 데이터 저장
            const gameId = await addVideo(gameInfo, [downloadURL], videoDownloadURL, uid);

            alert('게시글을 업로드했습니다!');
            router.push('registration');

            // Use gameId here
        } catch (error) {
            console.error('Error uploading thumbnails or video file:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full mx-12">
                <ComponentTitle title="영상 등록" justify="start" />
                <div className="flex justify-between">
                    <div className="flex flex-col bg-gray-200 p-4 rounded-md">
                        <label htmlFor="videoUpload" className="mb-2 font-bold">
                            Upload GameVideo:
                        </label>
                        <input
                            type="file"
                            id="videoUpload"
                            className="border p-2 rounded-md bg-white"
                            onChange={(e) => handleVideoFileChange(e)}
                        />

                        <div className="photoThumbnail flex flex-col w-[50vw] mt-4 space-y-4">
                            <label
                                htmlFor={`thumbnail`}
                                className="border p-16 rounded-md h-[500px] bg-white cursor-pointer hover:border-blue-500 flex flex-col items-center justify-center"
                            >
                                <Image
                                    src={videoImg.url ? videoImg.url : uploadImg}
                                    alt="썸네일"
                                    width={500}
                                    height={500}
                                    className="w-[50%] h-[50%] object-contain rounded-md "
                                />
                                {thumbnails.name ? (
                                    ''
                                ) : (
                                    <span className="text-center mt-5">+ Click to select GameTumbnail or GamePack</span>
                                )}

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
                            {Object.entries(gameInfo).map(([key, value]) => (
                                <div key={key} className="mb-4 ">
                                    <label className="mr-2 block">{key}</label>
                                    {key === '게임소개' ? (
                                        <textarea
                                            value={value as string}
                                            placeholder="게임소개를 작성해주세요"
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-[300px] h-[100px] rounded-sm outline-none px-1"
                                            style={{ resize: 'none' }}
                                        />
                                    ) : key === '게임명' ? (
                                        <textarea
                                            value={value as string}
                                            placeholder="게임이름"
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-[300px] h-[25px] rounded-sm outline-none px-1"
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
                                            value={value.toLocaleString('ko-KR') as Number}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-[300px] rounded-sm outline-none px-1"
                                            placeholder={key === 'price' ? '가격작성' : '재고수량'}
                                        />
                                    )}
                                </div>
                            ))}
                            <button type="submit" className="w-[300px] h-[50px] bg-slate-500 rounded-md mt-10">
                                판매글 게시
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
};

export default Registration;

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

const ReviseVideoInfo = () => {
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

    const addVideo = async (videoInfo, thumbnailPaths, videoFileURL, uid) => {
        const videoCollectionRef = doc(collection(db, 'Video', uid, 'List'));
        const videoDocRef = doc(videoCollectionRef, uid, 'list');

        try {
            await setDoc(videoCollectionRef, {
                ...videoInfo,
                thumbnail: thumbnailPaths[0], // 첫 번째 썸네일을 메인 썸네일로 설정
                videoFile: videoFileURL, // 게임 파일 URL 저장
                timestamp: serverTimestamp(),
                videoId: `${uid}_${videoInfo.영상명}`,
                uploadUser: uid,
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
        영상명: '',
        장르: '',
        영상소개: '',
        판매여부: false,
        price: 0,
    };

    const [videoInfo, setVideoInfo] = useState(initialVideoInfo);

    const handleInputChange = (key: string, value: string | number | boolean) => {
        setVideoInfo((prevVideoInfo) => ({
            ...prevVideoInfo,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 썸네일 업로드
        const thumbnailStorageRef = ref(storage, `thumbnails/${uid}_${videoInfo.영상명}_thumbnail.jpg`);
        const videotorageRef = ref(storage, `video/${uid}_${videoInfo.영상명}_videoFile.zip`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        try {
            const snapshot = await uploadBytes(thumbnailStorageRef, thumbnails, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('Thumbnail Download URL:', downloadURL);

            const videonap = await uploadBytes(videotorageRef, videoFile as Blob | Uint8Array | ArrayBuffer);
            const videoDownloadURL = await getDownloadURL(videonap.ref);
            console.log('Video File Download URL:', videoDownloadURL);

            // 게임 데이터 저장
            const videoId = await addVideo(videoInfo, [downloadURL], videoDownloadURL, uid);

            // Use videoId here
        } catch (error) {
            console.error('Error uploading thumbnails or video file:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full mx-12">
                <ComponentTitle title="영상 수정" justify="start" />
                <div className="flex justify-between">
                    <div className="flex flex-col bg-gray-200 p-4 rounded-md">
                        <label htmlFor="videoUpload" className="mb-2 font-bold">
                            Upload Video:
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
                                className="border p-16 rounded-md h-[500px] bg-white cursor-pointer hover:border-blue-500"
                            >
                                <Image
                                    src={videoImg.url}
                                    alt="썸네일"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover rounded-md"
                                />
                                {thumbnails.name ? (
                                    ''
                                ) : (
                                    <span className="text-center">+ Click to select VideoThumbnail</span>
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
                            {Object.entries(videoInfo).map(([key, value]) => (
                                <div key={key} className="mb-4 ">
                                    <label className="mr-2 block">{key}</label>
                                    {key === '연령제한' ? (
                                        // Dropdown for 'age'
                                        <select
                                            value={value as string}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                        >
                                            <option value="전체 이용가">전체 이용가</option>
                                            <option value="12세 이용가">12세 이용가</option>
                                            <option value="15세 이용가">15세 이용가</option>
                                        </select>
                                    ) : key === '판매여부' ? (
                                        // Checkbox for 'isDemo'
                                        <input
                                            type="checkbox"
                                            checked={value as boolean}
                                            onChange={() => handleInputChange(key, !value)}
                                        />
                                    ) : key === 'price' && !videoInfo['판매여부'] ? (
                                        // Label and input for 'price' only when 'isDemo' is true
                                        (videoInfo.price = 0)
                                    ) : key === '영상소개' ? (
                                        <textarea
                                            value={value as string}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="w-[300px] h-[100px] rounded-sm"
                                            style={{ resize: 'none' }}
                                        />
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
                                영상글 게시
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

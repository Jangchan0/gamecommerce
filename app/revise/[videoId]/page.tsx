'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import ComponentTitle from '@/components/ComponentTitle';
import UseAuthVerification from 'Hooks/UseAuthVerification';
import Image from 'next/image';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';

const ReviseVideoInfo = () => {
    const router = useRouter();
    const videoQuery = usePathname();
    const modifiedVideoId = decodeURIComponent(videoQuery)?.replace(/^.*\/revise\//, '');

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

    const reviseVideo = async (videoInfo, thumbnailPaths, uid) => {
        const videoCollectionRef = collection(db, 'Video', uid, 'List');
        const q = query(videoCollectionRef, where('timestamp', '==', videoInfo.timestamp));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;
            const docRef = doc(db, 'Video', uid, 'List', docId);
            const thumbnailStorageRef = ref(storage, `thumbnails/${uid}_${videoInfo.영상명}_thumbnail.jpg`);

            const updatedData = {
                ...videoInfo,
                ...reviseDetailInfo,
                thumbnail: thumbnailPaths[0], // 첫 번째 썸네일을 메인 썸네일로 설정
                timestamp: serverTimestamp(),
                videoId: `${uid}_${videoInfo.영상명}`,
            };

            try {
                await setDoc(docRef, updatedData, { merge: true });

                await deleteObject(thumbnailStorageRef);
                const snapshot = await uploadBytes(thumbnailStorageRef, thumbnails);

                const oldVideoFilePath = videoInfo.videoFile
                    .replace('https://firebasestorage.googleapis.com/v0/b/fir-geagul.appspot.com/o/', '')
                    .split('?')[0];

                const oldVideoRef = ref(storage, decodeURIComponent(oldVideoFilePath));
                const oldVideoURL = await getDownloadURL(oldVideoRef);
                const response = await fetch(oldVideoURL);
                const blob = await response.blob();
                console.log(blob);

                // 다운로드한 영상 파일을 새로운 이름으로 업로드
                const newVideoRef = ref(storage, `video/${uid}_${videoInfo.영상명}_videoFile.zip`);
                await uploadBytes(newVideoRef, blob);

                // 원본 영상 파일 삭제
                await deleteObject(oldVideoRef);
                return uid;
            } catch (error) {
                console.error('Error updating video document:', error);
                return null; // Return null or any other value to indicate failure
            }
        } else {
            console.error('No document found with the given timestamp');
            return null;
        }
    };

    const [videoFile, setVideoFile] = useState<Blob | Uint8Array | ArrayBuffer>();
    const [thumbnails, setThumbnails] = useState([null]);
    const [videoImg, setVideoImg] = useState([]);
    console.log(videoImg);

    const handleThumbnailChange = (event) => {
        // 업로드 이미지 변경 로직 수정필요!
        let newThumbnails = thumbnails;
        const file = event.target.files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            newThumbnails = { url };
            setVideoImg(newThumbnails); // 인풋에 보여질 사진
            setThumbnails(file); // 전송할 파일 담기
        }
    };

    const initialVideoInfo = {
        price: 0,
        thumbnail: '',
        uploadUser: '',
        videoFile: '',
        videoId: '',
        영상명: '',
        영상소개: '',
        장르: '',
        판매여부: false,
    };

    const videoInfoDefaultValue = {
        price: 0,
        영상명: '',
        영상소개: '',
        장르: '',
        판매여부: false,
    };

    const [videoInfo, setVideoInfo] = useState(initialVideoInfo);
    const [reviseDetailInfo, setReviseDetailInfo] = useState(videoInfoDefaultValue);

    const extractNecessaryInfo = (sourceInfo) => {
        const { 영상명, 장르, 영상소개, 판매여부, price } = sourceInfo;
        return { 영상명, 장르, 영상소개, 판매여부, price };
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
                const videoCollectionRef = collection(db, 'Video', uid, 'List');
                const q = query(videoCollectionRef, where('videoId', '==', modifiedVideoId));
                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs[0].data();
                setVideoInfo(data);

                const extractedInfo = extractNecessaryInfo(data);
                setReviseDetailInfo(extractedInfo);
                // setVideoInfo({
                //     ...videoInfo,
                //     thumbnail: thumbnails[0] as unknown as string,
                // });
            } catch (error) {
                console.error('Error getting document:', error);
            }
        };

        fetchData();
    }, [modifiedVideoId, uid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const thumbnailStorageRef = ref(storage, `thumbnails/${uid}_${videoInfo.영상명}_thumbnail.jpg`);
        const videotorageRef = ref(storage, `video/${uid}_${videoInfo.영상명}_videoFile.zip`);
        // const metadata = {
        //     contentType: 'image/jpeg',
        // };

        try {
            const snapshot = await uploadBytes(thumbnailStorageRef, thumbnails);
            const downloadURL = await getDownloadURL(snapshot.ref);
            // console.log('Thumbnail Download URL:', downloadURL);

            // const videonap = await uploadBytes(videotorageRef, videoFile as Blob | Uint8Array | ArrayBuffer);
            // const videoDownloadURL = await getDownloadURL(videonap.ref);
            // console.log('Video File Download URL:', videoDownloadURL);

            // 게임 데이터 저장
            await reviseVideo(videoInfo, [downloadURL], uid);

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
                        <div className="border p-2 rounded-md bg-white">
                            <span>{videoInfo.videoId ? '수정할 파일: ' + videoInfo.영상명 : 'No file selected'}</span>
                        </div>

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
                                {/* {thumbnails.name ? (
                                    ''
                                ) : (
                                    <span className="text-center">+ Click to select VideoThumbnail</span>
                                )} */}

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
                                    {key === '판매여부' ? (
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
                                영상글 수정
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

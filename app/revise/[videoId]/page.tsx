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

        setThumbnails(videoInfo.thumbnail);

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
            const thumbnailStorageRef = ref(storage, `thumbnails/${uid}_${videoInfo.게임명}_thumbnail.jpg`);

            const updatedData = {
                ...videoInfo,
                ...reviseDetailInfo,
                thumbnail: thumbnailPaths[0], // 첫 번째 썸네일을 메인 썸네일로 설정
                timestamp: serverTimestamp(),
                videoId: `${uid}_${videoInfo.게임명}`,
            };

            try {
                await setDoc(docRef, updatedData, { merge: true });

                /////// 수정 삭제 해야하는 부분!!! ///////

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

    const initialVideoInfo = {
        price: 0,
        thumbnail: '',
        uploadUser: '',
        videoFile: '',
        videoId: '',
        게임명: '',
        게임소개: '',
        장르: '',
        판매여부: false,
    };

    const videoInfoDefaultValue = {
        게임명: '',
        게임소개: '',
        장르: '',
        price: 0,
        재고수량: 0,
    };

    const [videoInfo, setVideoInfo] = useState(initialVideoInfo);
    const [reviseDetailInfo, setReviseDetailInfo] = useState(videoInfoDefaultValue);

    const extractNecessaryInfo = (sourceInfo) => {
        const { 게임명, 장르, 게임소개, 판매여부, 재고수량, price } = sourceInfo;
        return { 게임명, 장르, 게임소개, 판매여부, 재고수량, price };
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

        const thumbnailStorageRef = ref(storage, `thumbnails/${uid}_${videoInfo.게임명}_thumbnail.jpg`);
        const videotorageRef = ref(storage, `video/${uid}_${videoInfo.게임명}_videoFile.zip`);
        // const metadata = {
        //     contentType: 'image/jpeg',
        // };

        try {
            const snapshot = await uploadBytes(thumbnailStorageRef, thumbnails);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('Thumbnail Download URL:', downloadURL);

            const videonap = await uploadBytes(videotorageRef, videoFile as Blob | Uint8Array | ArrayBuffer);
            const videoDownloadURL = await getDownloadURL(videonap.ref);
            console.log('Video File Download URL:', videoDownloadURL);

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
                            Upload GameVideo:
                        </label>
                        <div className="border p-2 rounded-md bg-white">
                            <span>{videoInfo.videoId ? '수정할 파일: ' + videoInfo.게임명 : 'No file selected'}</span>
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

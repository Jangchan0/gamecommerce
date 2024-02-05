'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { videoInfoState } from '@/recoil/atoms/recoilAtoms';
import UseAuthVerification from '@/Hooks/UseAuthVerification';
import UseGetUserUid from '@/Hooks/UseGetUserUid';

const ProductBox = (props) => {
    const { videoInfo } = props;
    const router = useRouter();
    console.log(videoInfo);
    const userUid = UseGetUserUid();

    const MoveRevisePage = () => {
        if (userUid !== videoInfo.uploadUser) {
            alert('영상을 업로드한 유저와 계정정보가 일치하지않습니다.');
            router.push('/');
            return;
        }

        router.push(`/revise/${videoInfo.videoId}`);
    };
    return (
        <div className="flex mb-3 p-4 bg-slate-200 ">
            <div className="w-[250px] h-[150px] mr-5">
                <Image
                    src={videoInfo.thumbnail}
                    alt="썸네일"
                    width={300}
                    height={300}
                    priority
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex flex-col gap-2 bg-slate-300 w-[300px]">
                <h2 className="text-xl bolder">{videoInfo.영상명}</h2>
                <p className="text-sm">{videoInfo.장르}</p>
                <p>{videoInfo.영상소개}</p>
            </div>
            <div className="flex flex-col mx-auto">
                <button className="buttonCustom" onClick={MoveRevisePage}>
                    수정
                </button>
                <button className="buttonCustom">삭제</button>
            </div>
        </div>
    );
};

export default ProductBox;
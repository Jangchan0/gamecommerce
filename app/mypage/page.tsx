'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../firebase';
import { UseGet } from '@/Hooks/UseGetDoc';

const MyPage = () => {
    const router = useRouter();
    const [userPosition, setUserPosition] = useState<Number | null>(null);
    useEffect(() => {
        const auth = getAuth(app);

        // fetchData -> useGet을 통해 user정보 수신 및 포지션 파악
        const fetchData = async (userEmail: string) => {
            try {
                const userData = await UseGet(userEmail);
                if (userData) {
                    setUserPosition(userData.position);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // 로그인 여부 확인 및 커스텀 훅에 유저의 이메일을 인자로 전달
        const loginVerification = onAuthStateChanged(auth, (user) => {
            if (!user) {
                alert('로그인이 필요합니다');
                router.push('/auth/login');
            } else {
                fetchData(user.email as string);
            }
        });

        return () => loginVerification();
    }, [router]);

    // 개발자라면 판매게임 목록 / 찜목록 전환가능
    // 게이머라면 찜목록

    return (
        <>
            <div className="flex flex-col   mx-auto  my-auto">
                <div className=" flex justify-between w-full mb-5 items-baseline">
                    <h2 className="componentTitle ">My Page</h2>
                    <div>게임등록+</div>
                </div>
                <div className="myGameList flex justify-between min-h-[600px]">
                    <div className="w-[50vw] bg-slate-300 ">게임제작 목록</div>
                    <div className=" w-[25vw] ml-[20px]">
                        <div className=" h-[60%] bg-slate-300 ">찜목록</div>
                        <div className=" h-[40%] bg-slate-200"> 유저 정보</div>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
};

export default MyPage;

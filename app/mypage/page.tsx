'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../firebase';
import { UseGet } from '@/Hooks/useGetDoc';

const MyPage = () => {
    const router = useRouter();
    const [userPosition, setUserPosition] = useState<Number | null>(null);
    useEffect(() => {
        const auth = getAuth(app);

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
                <div className="myGameList flex justify-between h-full">
                    <div className="w-[50vw] bg-slate-300 h-[600px]">게임제작 목록</div>
                    <div className=" w-[25vw] ml-[20px]">
                        <div className="h-[290px] bg-slate-300 mb-[20px]">찜목록</div>
                        <div className="h-[290px] bg-slate-200"> 유저 정보</div>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
};

export default MyPage;

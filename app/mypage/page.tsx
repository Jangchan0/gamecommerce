'use client';
import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../firebase';

const MyPage = () => {
    const router = useRouter();
    React.useEffect(() => {
        const auth = getAuth(app);

        const loginVerification = onAuthStateChanged(auth, (user) => {
            if (!user) {
                alert('로그인이 필요합니다');
                router.push('/auth/login');
            }
        });
        return () => loginVerification();
    }, [router]);

    // 개발자라면 판매게임 목록 / 찜목록 전환가능
    // 게이머라면 찜목록

    return (
        <>
            <div className="flex">
                <div className="mypageTitle flex justify-between">
                    <h2>My Page</h2>
                    <div>게임등록+</div>
                </div>
                <div className="myGameList flex">
                    <div></div>
                </div>
            </div>
            <div />
        </>
    );
};

export default MyPage;

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
    return <div>MyPage</div>;
};

export default MyPage;

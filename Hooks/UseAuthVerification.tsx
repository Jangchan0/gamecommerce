'use client';

import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/app/firebase';

const UseAuthVerification = () => {
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);

        const loginVerification = onAuthStateChanged(auth, (user) => {
            if (!user) {
                alert('로그인이 필요합니다');
                router.push('/auth/login');
            }
        });

        return () => loginVerification();
    }, [router]);
};

export default UseAuthVerification;

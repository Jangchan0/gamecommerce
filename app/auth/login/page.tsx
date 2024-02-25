'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/app/firebase';
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user', user);
        });
    }, []);

    const onChange = (event: { target: { name: string; value: string } }) => {
        const {
            target: { name, value },
        } = event;
        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    const signUp = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('user', userCredential.user);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error with signUp', errorCode, errorMessage);
        }
    };
    const signIn = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            setPersistence(auth, browserSessionPersistence); // 인증 지속성을 위해 추가
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert('로그인 성공!');
            router.push('/'); // 로그인 성공하믄 홈으로 이동!
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('로그인 실패..');
            console.log('error with signIn', errorCode, errorMessage);
        }
    };
    const logOut = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await signOut(auth);
    };

    return (
        <div className="flex-col flex w-full h-full justify-center items-center">
            <div className="space-y-1">
                <div className="text-2xl">Login</div>
            </div>
            <div>
                <div className="space-y-4">
                    <div className="space-y-2 flex flex-col ">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            placeholder="m@example.com"
                            name="email"
                            onChange={onChange}
                            className="w-96 border-black border-solid border px-2 h-12 rounded-sm"
                            required
                        />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            value={password}
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={onChange}
                            className="w-96 border-black border-solid border px-2 h-12 rounded-sm"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <button className="w-96 h-12 bg-black text-white rounded-md mt-8 mb-4" onClick={signIn}>
                    Login
                </button>
                <Link href={'/auth/signUp'}>
                    <p className="text-slate-400 ">계정이 없으십니까? 회원가입하세요!</p>
                </Link>
            </div>
        </div>
    );
};

export default Login;

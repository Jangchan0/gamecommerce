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

const Login = () => {
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
            console.log('user with signIn', userCredential.user);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error with signIn', errorCode, errorMessage);
        }
    };
    const logOut = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await signOut(auth);
    };

    return (
        <div className="Login">
            <h2>로그인</h2>
            <form>
                <div>
                    <label>이메일 : </label>
                    <input type="email" value={email} name="email" onChange={onChange} required></input>
                </div>
                <div>
                    <label>비밀번호 : </label>
                    <input type="password" value={password} name="password" onChange={onChange} required></input>
                </div>
                <button onClick={signUp}>회원가입</button>
                <button onClick={signIn}>로그인</button>
                <button onClick={logOut}>로그아웃</button>
            </form>
        </div>
    );
};

export default Login;

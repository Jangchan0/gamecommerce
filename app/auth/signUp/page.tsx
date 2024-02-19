'use client';
import { useRecoilState } from 'recoil';
import { signUpState } from '@/recoil/atoms/recoilAtoms';
import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/app/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const router = useRouter();
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
    const [passwordMatchError, setPasswordMatchError] = React.useState(false);

    const onEmailHandler = (e) => {
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            email: e.target.value,
        }));
    };

    const onNameHandler = (e) => {
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            username: e.target.value,
        }));
    };

    const onPasswordHandler = (e) => {
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            password: e.target.value,
        }));
    };

    const onConfirmPasswordHandler = (e) => {
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            confirmPassword: e.target.value,
        }));
    };

    // 비밀번호 확인
    React.useEffect(() => {
        if (signUpInfo.password !== signUpInfo.confirmPassword && signUpInfo.confirmPassword.length > 0) {
            setPasswordMatchError(true);
        } else if (signUpInfo.password === signUpInfo.confirmPassword) {
            setPasswordMatchError(false);
        }
    }, [signUpInfo.confirmPassword, signUpInfo.password]);

    const onSignUpHandler = async (e) => {
        e.preventDefault();
        if (
            signUpInfo.email &&
            signUpInfo.username &&
            signUpInfo.password &&
            signUpInfo.confirmPassword &&
            !passwordMatchError
        ) {
            try {
                const userDocRef = doc(db, 'users', signUpInfo.email);

                await setDoc(userDocRef, {
                    email: signUpInfo.email,
                    username: signUpInfo.username,
                    position: signUpInfo.position,
                });
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    signUpInfo.email,
                    signUpInfo.password
                );

                alert('회원가입 성공!');
                router.push('/auth/login');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        alert('이미 사용 중인 이메일 주소입니다.');
                        break;

                    default:
                        alert('회원가입 실패. 다시 시도해주세요.');
                }
            }
        } else {
            if (passwordMatchError) {
                alert('비밀번호가 일치하지 않습니다');
            } else {
                alert('모든 정보를 입력해주세요');
            }
        }
    };

    return (
        <form className="flex flex-col">
            <label>Email</label>
            <input type="email" value={signUpInfo.email} onChange={onEmailHandler} />
            <label>Name</label>
            <input type="text" value={signUpInfo.username} onChange={onNameHandler} />
            <label>Password</label>
            <input type="password" value={signUpInfo.password} onChange={onPasswordHandler} />
            <label>Confirm Password</label>
            <input type="password" value={signUpInfo.confirmPassword} onChange={onConfirmPasswordHandler} />

            {passwordMatchError ? <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p> : ''}

            <br />
            <button onClick={onSignUpHandler}>회원가입</button>
        </form>
    );
};

export default SignUpForm;

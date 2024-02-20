'use client';

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { signUpState, signUpInfoSelector } from '@/recoil/atoms/recoilAtoms';
import { useRouter } from 'next/navigation';

export default function SignUpComponent() {
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
    const [passwordMatchError, setPasswordMatchError] = React.useState(false);
    const router = useRouter();

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

    // JSX for the combined component
    return (
        <div className="px-4 py-6 space-y-4">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">회원가입</h1>
                <p className="text-gray-500 dark:text-gray-400">정보를 입력해주세요.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        placeholder="m@example.com"
                        required
                        value={signUpInfo.email}
                        onChange={(e) => setSignUpInfo({ ...signUpInfo, email: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="username">유저 닉네임</label>
                    <input
                        id="username"
                        placeholder="myname99"
                        required
                        value={signUpInfo.username}
                        onChange={(e) => setSignUpInfo({ ...signUpInfo, username: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="w-full space-y-2">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                id="password"
                                required
                                type="password"
                                value={signUpInfo.password}
                                onChange={(e) => setSignUpInfo({ ...signUpInfo, password: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirm-password">비밀번호 확인</label>
                    <input
                        id="confirm-password"
                        required
                        type="password"
                        value={signUpInfo.confirmPassword}
                        onChange={(e) => setSignUpInfo({ ...signUpInfo, confirmPassword: e.target.value })}
                    />
                    {passwordMatchError ? <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p> : ''}
                </div>
                <div className="space-y-2">
                    <label htmlFor="address">주소</label>
                    <input
                        id="address"
                        placeholder="서울특별시 강남구"
                        required
                        value={signUpInfo.address}
                        onChange={(e) => setSignUpInfo({ ...signUpInfo, address: e.target.value })}
                    />
                </div>
                <button className="w-full" type="submit">
                    가입하기
                </button>
            </form>
        </div>
    );
}

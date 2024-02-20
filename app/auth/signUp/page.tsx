'use client';

import React from 'react';
import { useRecoilState } from 'recoil';
import { signUpState } from '@/recoil/atoms/recoilAtoms';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/app/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

export default function SignUpComponent() {
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
    const [passwordMatchError, setPasswordMatchError] = React.useState(false);
    const [isUsernameDuplicate, setIsUsernameDuplicate] = React.useState(false);
    const router = useRouter();

    const formFields = [
        { id: 'email', label: '이메일', placeholder: 'm@example.com', type: 'text', required: true },
        { id: 'username', label: '유저 닉네임', placeholder: 'myname99', type: 'text', required: true },
        { id: 'address', label: '주소', placeholder: '서울특별시 강남구', type: 'text', required: true },
        { id: 'password', label: '비밀번호', placeholder: '', type: 'password', required: true },
        { id: 'confirmPassword', label: '비밀번호 확인', placeholder: '', type: 'password', required: true },
    ];

    React.useEffect(() => {
        if (signUpInfo.password !== signUpInfo.confirmPassword && signUpInfo.confirmPassword.length > 0) {
            setPasswordMatchError(true);
        } else if (signUpInfo.password === signUpInfo.confirmPassword) {
            setPasswordMatchError(false);
        }
    }, [signUpInfo.confirmPassword, signUpInfo.password]);

    const checkUsernameDuplicate = async (e) => {
        const usernameExists = await checkIfUsernameExists(e);
        setIsUsernameDuplicate(usernameExists);
    };

    const onSignUpHandler = async (e) => {
        e.preventDefault();
        if (
            signUpInfo.email &&
            signUpInfo.username &&
            signUpInfo.password &&
            signUpInfo.confirmPassword &&
            signUpInfo.address &&
            !passwordMatchError &&
            !isUsernameDuplicate
        ) {
            try {
                const userDocRef = doc(db, 'users', signUpInfo.email);

                await setDoc(userDocRef, {
                    email: signUpInfo.email,
                    username: signUpInfo.username,
                    address: signUpInfo.address,
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
        <div className="px-4 py-6 space-y-4">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">회원가입</h1>
                <p className="text-gray-500 dark:text-gray-400">정보를 입력해주세요.</p>
            </div>
            <form onSubmit={onSignUpHandler}>
                {formFields.map((field) => (
                    <div key={field.id} className="space-y-2 flex flex-col">
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                            id={field.id}
                            placeholder={field.placeholder}
                            required={field.required}
                            type={field.type}
                            value={signUpInfo[field.id]}
                            onChange={(e) => {
                                setSignUpInfo({ ...signUpInfo, [field.id]: e.target.value });
                                if (field.id === 'username') {
                                    checkUsernameDuplicate(e.target.value);
                                }
                            }}
                            className="rounded-sm outline-none border h-[40px] px-3"
                        />
                        {field.id === 'username' && isUsernameDuplicate && (
                            <p style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</p>
                        )}
                    </div>
                ))}
                {passwordMatchError ? <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p> : ''}
                <div className="w-full flex justify-center">
                    <button className="bg-slate-800 text-white w-[450px] h-[60px] rounded-md" type="submit">
                        가입하기
                    </button>
                </div>
            </form>
        </div>
    );
}

const checkIfUsernameExists = async (username) => {
    try {
        const usersCollectionRef = collection(db, 'users');
        const usernameQuery = query(usersCollectionRef, where('username', '==', username));

        const querySnapshot = await getDocs(usernameQuery);

        return querySnapshot.size > 0;
    } catch (error) {
        console.error('Error checking username existence:', error);

        return false;
    }
};

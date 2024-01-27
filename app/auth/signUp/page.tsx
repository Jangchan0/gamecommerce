'use client';
// 회원가입 /SignUp
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { signUpInfoState, signUpInfoSelector } from '@/recoil/atoms/recoilAtoms';
import PositionToast from './toast';

const SignUp = () => {
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
    const signUpInfoFromSelector = useRecoilValue(signUpInfoSelector);

    const handleChange = (position: number) => {
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            position: position,
        }));
    };

    console.log(signUpInfoFromSelector.position);

    // position 1 => 게임유저
    // position 2 => 개발자

    // 토스트 추가중!!!!!!!
    const goToDetailInfo = () => {
        if (signUpInfoFromSelector.position !== 0) {
            // 이동 로직 실행
            console.log('이동 로직 실행');
        } else {
            // PositionToast 컴포넌트 렌더링
            <PositionToast />;
        }
    };

    return (
        <>
            <div className="w-full h-[100vh] flex flex-col justify-center items-center ">
                <div className="flex">
                    <label
                        className="w-[20vw] h-[50vh] min-w-[100px] min-h-[300px] bg-rose-300 mr-8 flex flex-col pt-5 items-center rounded-xl cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                            handleChange(1);
                        }}
                    >
                        <div className="w-[200px] h-[200px] rounded-full bg-fuchsia-100 mb-8" />
                        일반유저입니까
                    </label>
                    <label
                        className="w-[20vw] h-[50vh] min-w-[100px] min-h-[300px] bg-rose-300 mr-8 flex flex-col pt-5 items-center  rounded-xl cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                            handleChange(2);
                        }}
                    >
                        <div className="w-[200px] h-[200px] rounded-full bg-fuchsia-100 mb-8" />
                        개발자입니까
                    </label>
                </div>

                <button className="w-[300px] h-[50px] rounded-sm bg-slate-400 mt-12" onClick={goToDetailInfo}>
                    선택완료
                </button>
            </div>
        </>
    );
};

export default SignUp;

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { signUpInfoState, signUpInfoSelector } from '@/recoil/atoms/recoilAtoms';

const SignInput = () => {
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
    const signUpInfoFromSelector = useRecoilValue(signUpInfoSelector);

    const handleChange = (type: string, value: string | number) => {
        setSignUpInfo((prevInfo) => ({
            ...prevInfo,
            [type]: value,
        }));
    };

    return (
        <>
            <div className="flex justify-center items-center w-[100vw] h-[100vh]">
                <form className="flex flex-col">
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler} />
                    <label>Name</label>
                    <input type="text" value={Name} onChange={onNameHandler} />
                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler} />
                    <label>Confirm Password</label>
                    <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                    <br />
                    <button formAction="">회원가입</button>
                </form>
            </div>
        </>
    );
};

export default SignInput;

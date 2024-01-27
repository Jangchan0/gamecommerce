import { atom, selector } from 'recoil';

// 회원가입 정보를 저장하는 atom
export const signUpInfoState = atom({
    key: 'signUpInfoState',
    default: {
        position: 0,
        username: '',
        email: '',
        password: '',
        phoneAuth: false,
    },
});

// 회원가입 정보를 가져오는 selector
export const signUpInfoSelector = selector({
    key: 'signUpInfoSelector',
    get: ({ get }) => {
        return get(signUpInfoState);
    },
});

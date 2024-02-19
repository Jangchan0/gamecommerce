'use client';
// atoms/recoilAtoms.js

import { atom, selector } from 'recoil';

export const signUpState = atom({
    key: 'signUpState',
    default: [{ email: '', username: '', password: '', confirmPassword: '' }],
});

export const signUpInfoSelector = selector({
    key: 'signUpInfoSelector',
    get: ({ get }) => {
        const signUpInfo = get(signUpState);
        // 추가적인 로직 적용 가능
        return signUpInfo;
    },
});

// Local Storage에 저장된 값을 초기 상태로 사용
const getInitialCartState = () => {
    const storedCart = localStorage.getItem('cartState');
    return storedCart ? JSON.parse(storedCart) : [];
};

export const cartState = atom({
    key: 'cartState',
    default: getInitialCartState(), // 로컬 스토리지 값으로 초기화
});

export const cartItemCountState = selector({
    key: 'cartItemCountState',
    get: ({ get }) => {
        const cart = get(cartState);
        return cart;
    },
});

export const isDropCart = atom({
    key: 'isDropCart',
    default: false,
});

export const isDropCartState = selector({
    key: 'isDropCartState',
    get: ({ get }) => {
        const drop = get(isDropCart);
        return !drop;
    },
});

'use client';
// atoms/recoilAtoms.js

import { atom, selector } from 'recoil';

export const signUpState = atom({
    key: 'signUpState',
    default: { email: '', username: '', password: '', confirmPassword: '', address: '' },
});

export const signUpInfoSelector = selector({
    key: 'signUpInfoSelector',
    get: ({ get }) => {
        const signUpInfo = get(signUpState);

        return signUpInfo;
    },
});

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

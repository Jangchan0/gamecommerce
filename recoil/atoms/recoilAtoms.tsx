'use client';
// atoms/recoilAtoms.js

import { atom, selector } from 'recoil';

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

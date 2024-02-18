import { atom, selector } from 'recoil';

// Recoil에서 사용할 상태(atom) 정의
export const cartState = atom({
    key: 'cartState',
    default: [],
});

// 장바구니에 들어있는 상품 갯수를 계산하는 selector 정의
export const cartItemCountState = selector({
    key: 'cartItemCountState',
    get: ({ get }) => {
        const cart = get(cartState);
        return cart;
    },
});

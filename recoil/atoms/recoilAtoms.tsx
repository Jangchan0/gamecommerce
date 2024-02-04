import { atom, selector } from 'recoil';

// 회원가입 정보를 저장하는 atom
export const videoInfoState = atom({
    key: 'videoInfo',
    default: {
        영상명: '',
        장르: '',
        가격: '',
        판매여부: null,
        price: 0,
    },
});

// 회원가입 정보를 가져오는 selector
export const signUpInfoSelector = selector({
    key: 'videoInfoSelector',
    get: ({ get }) => {
        return get(videoInfoState);
    },
});

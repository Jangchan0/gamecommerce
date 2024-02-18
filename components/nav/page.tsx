import React from 'react';
import Link from 'next/link';
import CartNumber from './cartNumber';

const Nav = () => {
    const officialGame = [
        { title: '액션', link: '/list/액션' },
        { title: '어드벤처', link: '/list/어드벤처' },
        { title: '캐주얼', link: '/list/캐주얼' },
        { title: '인디', link: '/list/인디' },
        { title: '대규모', link: '/list/대규모' },
        { title: '멀티 플레이어', link: '/list/멀티플레이어' },
        { title: '레이싱', link: '/list/레이싱' },
        { title: '시뮬레이션', link: '/list/시뮬레이션' },
        { title: 'RPG', link: '/list/RPG' },
        { title: '스포츠', link: '/list/스포츠' },
        { title: '전략', link: '/list/전략' },
        { title: '기타', link: '/list/기타' },
    ];

    return (
        <>
            <div className="bg-slate-500 sticky left-0 top-0 h-[100vh] w-[250px] px-5 py-2 flex flex-col justify-between rounded-r-sm">
                <div className="officialGame flex flex-col mb-10">
                    <h1 className="title text-4xl mb-11">Geagul</h1>
                    <h2 className="text-xl mb-3 ">Category</h2>
                    <div className="pl-7 pt-2 ">
                        {officialGame.map((cate, i) => (
                            <Link key={i} href={cate.link}>
                                <h3 className="mb-3 text-lg cursor-pointer">{cate.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="navUserInfo flex flex-col mt-4 ">
                    <div className="flex">
                        <p>장바구니 </p>
                        <CartNumber />
                    </div>
                    <div className="flex justify-between mb-6">
                        <p>유저 아이디</p>
                        <p>setting</p>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
};

export default Nav;

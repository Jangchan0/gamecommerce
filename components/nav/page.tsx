import React, { useState } from 'react';
import Link from 'next/link';
import CartNumber from './CartNumber';
import Logo from './Logo';

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

const Nav = () => {
    return (
        <>
            <div className="bg-slate-500 sticky left-0 top-0 h-[100vh] w-[250px] px-5 py-2 flex flex-col justify-between rounded-r-sm">
                <div className="officialGame flex flex-col mb-10">
                    <Logo />
                    <h2 className="text-xl mb-3 ">Category</h2>
                    <div className="pl-7 pt-2 ">
                        {officialGame.map((cate, i) => (
                            <Link key={i} href={cate.link}>
                                <h3 className="mb-2 text-lg cursor-pointer">{cate.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="navUserInfo flex flex-col  ">
                    <div>
                        <CartNumber />
                    </div>
                    <div className="flex justify-between ">
                        <Link href={'/mypage'}>
                            <p>마이페이지</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
};

export default Nav;

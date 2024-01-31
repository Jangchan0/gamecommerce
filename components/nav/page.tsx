import React from 'react';
import Link from 'next/link';

const Nav = () => {
    const officialGame = [
        { title: '오늘의 게임', link: '/today' },
        { title: 'Best Game', link: '/best' },
        { title: 'New Game', link: '/new' },
        { title: 'With Friend', link: '/friends' },
        { title: '장르별', link: '/genres' },
    ];
    const developmentGame = [
        { title: 'Up Coming', link: '/upcoming' },
        { title: 'Need To Feedback', link: '/needtofeedback' },
    ];

    return (
        <>
            <div className="bg-slate-500 sticky left-0 top-0 h-[100vh] w-[250px] px-5 py-2 flex flex-col">
                <h1 className="title text-4xl mb-11">Geagul</h1>
                <div className="officialGame flex flex-col mb-10">
                    <h2 className="text-xl mb-3 ">정식출시된</h2>
                    <div className="pl-7 pt-2 ">
                        {officialGame.map((cate, i) => (
                            <Link key={i} href={cate.link}>
                                <h3 className="mb-3 text-lg">{cate.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="developmentGame flex flex-col mb-10">
                    <h2 className="text-xl mb-3 ">개발중인 게임</h2>
                    <div className="pl-7 pt-2 ">
                        {developmentGame.map((cate, i) => (
                            <Link key={i} href={cate.link}>
                                <h3 className="mb-3 text-lg">{cate.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="downloadedGames text-lg mb-10">다운받은 게임</div>

                <div className="navUserInfo flex flex-col mt-4">
                    <div className="flex justify-between mb-6">
                        <p>유저 아이디</p>
                        <p>setting</p>
                    </div>
                    <p>버전 정보</p>
                </div>
            </div>
            <div />
        </>
    );
};

export default Nav;

import Login from '@/app/auth/login/page';
import GameList from '@/app/list/page';
import './globals.css';
import MyPage from './mypage/page';
import Registration from './registration/page';
import ReviseVideoInfo from './revise/[videoId]/page';
import Carousel from '@/components/mainLanding/Carousel';
import React from 'react';
import Category from '@/components/mainLanding/Category';
import useGetCategory from '@/Hooks/UseGetCategory';

function App() {
    const itemCategory = ['액션', 'RPG', '레이싱'];

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="recommedVideo mt-12">
                    <Carousel />
                </div>
                {itemCategory.map((item) => {
                    return <Category key={item} title={item} />;
                })}
            </div>
        </>
    );
}

export default App;

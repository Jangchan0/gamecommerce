import Login from '@/app/auth/login/page';
import GameList from '@/app/list/page';
import './globals.css';
import Nav from '@/components/nav/page';
import MyPage from './mypage/page';
import Registration from './registration/page';
import ReviseVideoInfo from './revise/[videoId]/page';
import Carousel from '@/components/mainLanding/Carousel';

function App() {
    return (
        <>
            <div className="flex">
                <Nav />
                <div className="flex flex-col w-full">
                    <div className="recommedVideo mt-12">
                        <Carousel />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

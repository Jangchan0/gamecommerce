import Login from '@/app/auth/login/page';
import GameList from '@/app/list/page';
import './globals.css';
import Nav from '@/components/nav/page';
import MyPage from './mypage/page';
import Registration from './registration/page';

import ReviseVideoInfo from './revise/page';

function App() {
    return (
        <>
            <div className="flex">
                <Nav />
                <ReviseVideoInfo />
            </div>
        </>
    );
}

export default App;

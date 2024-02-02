import Login from '@/app/auth/login/page';
import GameList from '@/app/list/page';
import './globals.css';
import Nav from '@/components/nav/page';
import MyPage from './mypage/page';
import Registration from './registration/page';
import QueryWrapper from './\bqueryWrapper';

function App() {
    return (
        <>
            <QueryWrapper>
                <div className="flex">
                    <Nav />
                    <MyPage />
                </div>
            </QueryWrapper>
        </>
    );
}

export default App;

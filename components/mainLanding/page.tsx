import React from 'react';
import Carousel from './carousel';

const MainLandingPage = () => {
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="recommedVideo mt-12">
                    <Carousel />
                </div>
            </div>
            <div />
        </>
    );
};

export default MainLandingPage;

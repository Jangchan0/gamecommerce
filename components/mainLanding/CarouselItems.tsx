import React from 'react';
import Image from 'next/image';

const CarouselItems = ({ videoItem }) => {
    const { gameData, thumbnailURL, videoURL } = videoItem;

    return (
        <div className="flex w-[500px] h-[300px] bg-slate-400">
            <div className="">
                <Image
                    src={thumbnailURL}
                    alt="썸네일"
                    style={{ objectFit: 'cover' }}
                    width={250}
                    height={300}
                    priority
                />
            </div>
            <div className="px-5">
                <h2 className="text-3xl mb-3">{gameData.게임명}</h2>
                <h3 className="">{gameData.장르}</h3>
                <h3 className="">{gameData.price}</h3>
                <h3 className="text-gray-300">{gameData.게임소개}</h3>
            </div>
        </div>
    );
};

export default CarouselItems;

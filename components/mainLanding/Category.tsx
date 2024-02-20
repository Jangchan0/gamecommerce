'use client';
/* eslint-disable @next/next/no-img-element */
import UseGetCategory from '@/Hooks/UseGetCategory';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CategoryBox from './CategoryBox';
import React from 'react';

export default function Category({ title }) {
    const [categoryData, setCategoryData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await UseGetCategory(title);
            setCategoryData(data);
        };
        fetchData();
    }, [title]);

    const gameData = categoryData[title];

    return (
        <>
            <div className="px-4 md:px-6 lg:px-8 pb-6">
                <div className="grid gap-6 lg:gap-12 items-start max-w-6xl mx-auto">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-bold">{title}</h2>
                        <nav className="flex ml-auto">
                            <Link className="ml-4 font-medium underline" href={`/list/${title}`}>
                                더보기
                            </Link>
                        </nav>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {gameData &&
                            gameData.length > 0 &&
                            gameData.map((item, index) => (
                                <div key={index} className="flex flex-col gap-2 cursor-pointer">
                                    <Link className="font-semibold" href={`/detail/${title}/${item.gameId}`}>
                                        <img
                                            alt="Image"
                                            className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                            height={180}
                                            src={item.thumbnail}
                                            width={180}
                                        />
                                        {item.게임명}
                                    </Link>
                                    <div className="font-semibold">${item.price}</div>
                                    <div className="text-sm not-italic">by {item.uploadUser}</div>
                                    <div className="text-sm">{item.게임소개}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

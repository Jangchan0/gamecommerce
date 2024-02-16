'use client';
/* eslint-disable @next/next/no-img-element */
import UseGetCategory from '@/Hooks/UseGetCategory';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CategoryBox from './CategoryBox';

export default function Category({ title }) {
    const [categoryData, setCategoryData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await UseGetCategory(title);
            setCategoryData(data);
        };
        fetchData();
    }, [title]);
    // console.log(title);
    const gameData = categoryData[title];

    return (
        <>
            <div className="px-4 md:px-6 lg:px-8 pb-6">
                <div className="grid gap-6 lg:gap-12 items-start max-w-6xl mx-auto">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-bold">{title}</h2>
                        <nav className="flex ml-auto">
                            <Link className="ml-4 font-medium underline" href="#">
                                더보기
                            </Link>
                        </nav>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col gap-2">
                            <Link className="font-semibold" href="#">
                                <img
                                    alt="Image"
                                    className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                    height={180}
                                    src="/placeholder.svg"
                                    width={180}
                                />
                                {categoryData.게임명}
                            </Link>
                            <div className="font-semibold">$99</div>
                            <div className="text-sm not-italic">by Acme Apparel</div>
                            <div className="text-sm">T-Shirts</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link className="font-semibold" href="#">
                                <img
                                    alt="Image"
                                    className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                    height={180}
                                    src="/placeholder.svg"
                                    width={180}
                                />
                                WhimsiMug: Sip in Style and Magic
                            </Link>
                            <div className="font-semibold">$99</div>
                            <div className="text-sm not-italic">by Acme Apparel</div>
                            <div className="text-sm">Mugs</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link className="font-semibold" href="#">
                                <img
                                    alt="Image"
                                    className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                    height={180}
                                    src="/placeholder.svg"
                                    width={180}
                                />
                                Elegance Watch: Timeless Beauty
                            </Link>
                            <div className="font-semibold">$99</div>
                            <div className="text-sm not-italic">by Acme Timepieces</div>
                            <div className="text-sm">Watches</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link className="font-semibold" href="#">
                                <img
                                    alt="Image"
                                    className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                    height={180}
                                    src="/placeholder.svg"
                                    width={180}
                                />
                                Sparkle Shoes: Walk in Glam
                            </Link>
                            <div className="font-semibold">$99</div>
                            <div className="text-sm not-italic">by Acme Footwear</div>
                            <div className="text-sm">Shoes</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

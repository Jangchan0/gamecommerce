'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import UseGetCategory from '../../../Hooks/UseGetCategory';
import ListProductBox from '../../../components/list/ListProductBox';

export default function GameList() {
    const [queryCategoryData, setQueryCategoryData] = useState(null);
    const URIQuery = decodeURIComponent(usePathname()).split('/');
    const domainCate = URIQuery[2];
    useEffect(() => {
        const fetchData = async () => {
            const data = await UseGetCategory(domainCate);
            setQueryCategoryData(data);
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-12 ">
                <h1 className="text-2xl font-bold">Category Products</h1>
                <select>
                    <option defaultValue="">Sort by</option>
                    <option value="latest">Latest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {queryCategoryData && queryCategoryData[domainCate] ? (
                    queryCategoryData[domainCate].map((item, index) => {
                        return <ListProductBox key={index} item={item} />;
                    })
                ) : (
                    <div>검색결과가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { collection, query, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import { useInView } from 'react-intersection-observer';
import { db } from '../firebase';
import UseGetUserUid from '@/Hooks/UseGetUserUid';
import ProductBox from './productBox';

const MyVideos = () => {
    const uid = UseGetUserUid();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        uid,
        async ({ pageParam = null }) => {
            const videoCollectionRef = collection(db, 'Video', uid, 'List');

            const q = pageParam
                ? query(videoCollectionRef, orderBy('timestamp', 'desc'), startAfter(pageParam), limit(5))
                : query(videoCollectionRef, orderBy('timestamp', 'desc'), limit(5));

            const querySnapshot = await getDocs(q);
            const videos = querySnapshot.docs.map((doc) => doc.data());

            return videos;
        },
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.length === 5) {
                    return lastPage[lastPage.length - 1].timestamp;
                }
                return null;
            },
        }
    );

    const { ref, inView } = useInView({
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <div>
                {data?.pages.map((page, pageIndex) => (
                    <React.Fragment key={pageIndex}>
                        {page.map((video, index) => (
                            <div key={index}>
                                <ProductBox key={index} videoInfo={video} />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div ref={ref}></div>
        </>
    );
};

export default MyVideos;

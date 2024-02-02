'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { collection, query, getDocs, where, orderBy, startAfter, limit } from 'firebase/firestore';
import { useInView } from 'react-intersection-observer';
// import VideoItem from './VideoItem'; // VideoItem 컴포넌트는 각 영상을 나타내는 컴포넌트로 가정합니다.
import { db } from '../firebase';
import UseGetUserUid from '@/Hooks/UseGetUserUid';
import ProductBox from './productBox';

const MyVideos = () => {
    const uid = UseGetUserUid();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        'Video',
        async ({ pageParam = 1 }) => {
            const videoCollectionRef = collection(db, 'Video', uid, 'List');
            const querySnapshot = await getDocs(
                query(
                    videoCollectionRef,
                    //  where('uploadUser', '==', uid),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )
            );

            const videos = querySnapshot.docs.map((doc) => doc.data());

            return videos;
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.length === 10) {
                    return allPages.length + 1;
                }
                return undefined;
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
                                <p>Video Name: {video.영상명}</p>
                                <p>Genre: {video.장르}</p>
                                {/* Add more properties as needed */}
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

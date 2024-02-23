'use client';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { collection, query, getDocs, orderBy, limit, startAfter, where } from 'firebase/firestore';
import { useInView } from 'react-intersection-observer';
import { db } from '../firebase';
import UseGetUserUid from '../../Hooks/UseGetUserUid';
import ProductBox from './productBox';

const MyGames = () => {
    const uid = UseGetUserUid();
    const [forceUpdate, setForceUpdate] = useState(false);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['myGames', uid],
        async ({ pageParam = null }) => {
            const videoCollectionRef = collection(db, 'Game');

            let q = query(
                videoCollectionRef,
                where('uploadUserUid', '==', uid),
                orderBy('timestamp', 'desc'),
                limit(5)
            );
            if (pageParam) {
                q = query(q, startAfter(pageParam));
            }

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

    const deleteVideoAndUpdateList = async (videoId) => {
        try {
            setForceUpdate((prevState) => !prevState); // state 변경으로 재랜더링 (리스트 업데이트)
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    return (
        <>
            <div>
                {data?.pages.map((page, pageIndex) => (
                    <React.Fragment key={pageIndex}>
                        {page.map((video, index) => (
                            <div key={index}>
                                <ProductBox
                                    key={index}
                                    videoInfo={video}
                                    onDelete={(onDelete: any) => deleteVideoAndUpdateList(onDelete)}
                                />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div ref={ref}></div>
        </>
    );
};

export default MyGames;

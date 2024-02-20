'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../firebase';
import MyVideoList from './myVideoList';
import UseAuthVerification from '@/Hooks/UseAuthVerification';
import OrderList from './orderList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UseGetUserUid from '@/Hooks/UseGetUserUid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MyPage = () => {
    UseAuthVerification();
    const router = useRouter();
    const [orderList, setOrderList] = useState(null);

    const uid = UseGetUserUid();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderCollectionRef = collection(db, 'Order');
                console.log(uid);
                const q = query(orderCollectionRef, where('uid', '==', uid));
                const querySnapshot = await getDocs(q);

                const orders = [];
                querySnapshot.forEach((doc) => {
                    orders.push(doc.data());
                });

                setOrderList(orders);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [uid]);

    return (
        <>
            <div className="flex flex-col mx-auto my-auto ">
                <div className=" flex justify-between w-full mb-5 items-baseline">
                    <h2 className="componentTitle ">My Page</h2>
                    <div onClick={() => router.push('/registration')} className="cursor-pointer">
                        상품 등록+
                    </div>
                </div>
                <div className="myGameList flex justify-between min-h-[600px] h-[80vh]">
                    <div className="w-[50vw]  bg-slate-300 overflow-scroll">
                        <MyVideoList />
                    </div>
                    <div className=" w-[35vw] ml-[20px]">
                        <div className=" h-[60%] bg-slate-300 overflow-y-scroll">
                            주문목록
                            {orderList &&
                                orderList.length > 0 &&
                                orderList.map((item) => {
                                    return <OrderList key={item.주문번호} orderList={item} />;
                                })}
                        </div>
                        <div className=" h-[40%] bg-slate-200"> 유저 정보</div>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
};

export default MyPage;

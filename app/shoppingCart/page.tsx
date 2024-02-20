'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { getFirestore, updateDoc, doc, getDoc } from 'firebase/firestore';
import UseAuthVerification from '../../Hooks/UseAuthVerification';
import CartItem from '../../components/shoppingCart/CartItem';
import UseGetUserInfo from '@/Hooks/UseGetUserInfo';

import BuyerInfo from './buyerInfo';

declare const window: typeof globalThis & {
    IMP: any;
};

export default function ShoppingCart() {
    UseAuthVerification();
    const [shoppingCartItem, setShoppingCartItem] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [showBuyerModal, setShowBuyerModal] = useState(false);
    console.log(showBuyerModal);

    const handleSetUserInfo = (user) => {
        setUserInfo(user);
    };

    UseGetUserInfo(handleSetUserInfo);

    useEffect(() => {
        const storedCart = localStorage.getItem('cartState');
        if (storedCart) {
            setShoppingCartItem(JSON.parse(storedCart));
        }
    }, []);

    const totalPrice = shoppingCartItem.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">장바구니</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="w-[50px]" />
                        <th>상품 정보</th>
                        <th>수량</th>
                        <th>개당금액</th>
                        <th>합계금액</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {shoppingCartItem.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
            </table>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <button className="border">선택 삭제</button>
                    <button className="border ml-2">선택 재주문</button>
                </div>
                <div className="text-right">
                    <div className="text-lg font-medium">총 {shoppingCartItem.length}개 상품금액</div>
                    <div className="text-2xl font-bold mt-2">{totalPrice.toLocaleString()}원</div>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className="border">선택 상품 주문</button>
                <button className="bg-[#bd1e59] text-white ml-2" onClick={() => setShowBuyerModal(!showBuyerModal)}>
                    전체 상품 주문
                </button>
                {showBuyerModal && (
                    <div className="fixed top-0 left-0 right-0 bottom-0">
                        <div className="bg-slate-600 opacity-80 absolute inset-0 -z-10"></div>
                        <div className="flex justify-center items-center h-full">
                            <BuyerInfo shoppingCartItem={shoppingCartItem} handleCartModal={setShowBuyerModal} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

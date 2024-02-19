'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import UseAuthVerification from '../../Hooks/UseAuthVerification';
import CartItem from '../../components/shoppingCart/CartItem';

export default function ShoppingCart() {
    UseAuthVerification();
    const [shoppingCartItem, setShoppingCartItem] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cartState');
        if (storedCart) {
            setShoppingCartItem(JSON.parse(storedCart));
        }
    }, []);

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
                    <div className="text-2xl font-bold mt-2">
                        {shoppingCartItem
                            .reduce((total, item) => total + item.price * item.quantity, 0)
                            .toLocaleString()}
                        원
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className="border">선택 상품 주문</button>
                <button className="bg-[#bd1e59] text-white ml-2">전체 상품 주문</button>
            </div>
        </div>
    );
}

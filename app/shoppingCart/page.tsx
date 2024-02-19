'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { getFirestore, updateDoc, doc, getDoc } from 'firebase/firestore';
import UseAuthVerification from '../../Hooks/UseAuthVerification';
import CartItem from '../../components/shoppingCart/CartItem';
import UseGetUserInfo from '@/Hooks/UseGetUserInfo';
import axios from 'axios';

declare const window: typeof globalThis & {
    IMP: any;
};

export default function ShoppingCart() {
    UseAuthVerification();
    const [shoppingCartItem, setShoppingCartItem] = useState([]);
    const [userInfo, setUserInfo] = useState();

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

    function onClickPayment() {
        if (!window.IMP) return;

        const { IMP } = window;
        IMP.init('imp36774883');

        const data = {
            pg: 'kakao', // pg사
            pay_method: 'kakaopay', // 결제 수단
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: totalPrice,
            name: '아임포트 결제 데이터 시험',
            buyer_name: '홍길동',
            buyer_tel: '01012341234',
            buyer_email: 'example@example.com',
            buyer_addr: '신사동 661-16',
            buyer_postcode: '06018',
        };

        IMP.request_pay(data, async (response) => {
            const { success, error_msg } = response;

            if (success) {
                try {
                    const db = getFirestore();

                    for (const item of shoppingCartItem) {
                        const productDocRef = doc(db, 'products', item.productId);
                        const productDoc = await getDoc(productDocRef);

                        if (productDoc.exists()) {
                            const currentStock = productDoc.data().stock;
                            const newStock = currentStock - item.quantity;

                            await updateDoc(productDocRef, { stock: newStock });
                        }
                    }

                    alert('결제 성공');
                } catch (error) {
                    console.error('Error updating product stock:', error);
                    alert('결제 성공, 상품 재고 업데이트 실패');
                }
            } else {
                alert(`결제 실패: ${error_msg}`);
            }
        });
    }

    // const onClickPayment = () => {
    //     var IMP = window.IMP;
    //     IMP.init('imp36774883'); // Example: imp00000000

    //     if (typeof window !== 'undefined' && typeof window.IMP !== 'undefined') {
    //         IMP.request_pay({ data }, (rsp: any) => {
    //             // callback
    //             if (rsp.success) {
    //                 // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
    //                 axios({
    //                     url: 'https://www.myservice.com/payments/complete', // 예: https://www.myservice.com/payments/complete
    //                     method: 'post',
    //                     headers: { 'Content-Type': 'application/json' },
    //                     data: {
    //                         imp_uid: rsp.imp_uid,
    //                         merchant_uid: rsp.merchant_uid,
    //                     },
    //                 }).then((data) => {
    //                     console.log(data);
    //                     alert('결제 성공!');
    //                 });
    //             } else {
    //                 alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
    //             }
    //         });
    //     } else {
    //         console.log('imp가 없습니다');
    //     }
    // };

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
                <button className="bg-[#bd1e59] text-white ml-2" onClick={onClickPayment}>
                    전체 상품 주문
                </button>
            </div>
        </div>
    );
}

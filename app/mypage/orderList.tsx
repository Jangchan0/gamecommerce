'use client';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const OrderList = (props) => {
    const item = props.orderList;
    const [isCancelled, setIsCancelled] = useState(false);
    const [cancelledProducts, setCancelledProducts] = useState(new Set());

    const orderDate = new Date(item.주문일시);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formattedOrderDate = new Intl.DateTimeFormat('ko-KR', options).format(orderDate);

    const handleCancelProduct = async (productId) => {
        try {
            const db = getFirestore();
            const orderDocRef = doc(db, 'Order', item.주문번호);

            // Update the product's status to 'CANCELED'
            await updateDoc(orderDocRef, {
                주문상품: item.주문상품.map((product) => {
                    if (product.상품명 === productId) {
                        return { ...product, 주문상태: 'CANCELED' };
                    }
                    alert('상품 주문이 취소되었습니다.');
                    return product;
                }),
            });

            // Add the cancelled product to the set
            setCancelledProducts((prevCancelledProducts) => new Set([...prevCancelledProducts, productId]));
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };

    return (
        <>
            <main className="bg-white h-[200px] border-b-2 ">
                <div className="flex justify-between">
                    <p>{formattedOrderDate}</p>
                </div>
                <div className=" overflow-scroll flex ">
                    <div>
                        배송지: {item.주소}
                        {item.주문상품.map((product, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className=" bg-slate-300">
                                        <div className="grid grid-cols-3">
                                            <p>상품명: {product.상품명}</p>
                                            <p>주문수량: {product.상품수량}</p>
                                            <p>주문상태: {product.주문상태}</p>
                                        </div>
                                        <p>판매자: {product.판매자}</p>
                                        <div>
                                            {!isCancelled && (
                                                <button onClick={() => handleCancelProduct(product.상품명)}>
                                                    상품취소
                                                </button>
                                            )}
                                            {isCancelled && <p>주문이 취소되었습니다.</p>}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderList;

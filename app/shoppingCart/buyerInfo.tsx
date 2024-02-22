'use client';
import React, { useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import UseGetUserUid from '@/Hooks/UseGetUserUid';

declare const window: typeof globalThis & {
    IMP: any;
};

const BuyerInfo = (props) => {
    const { shoppingCartItem, handleCartModal } = props;

    const totalPrice = shoppingCartItem.reduce((total, item) => total + item.price * item.quantity, 0);
    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
    });

    const uploadUids = shoppingCartItem.map((item) => item.uploadUserUid);
    const orderInfo = shoppingCartItem.map((item) => ({
        상품명: item.name,
        상품수량: item.quantity,
        판매자: item.uploadUser,
        uploadUserUid: item.uploadUserUid,
        주문상태: '주문완료',
    }));

    const uid = UseGetUserUid();

    function onClickPayment() {
        if (!window.IMP) return;

        const { IMP } = window;
        IMP.init('imp36774883');

        const data = {
            pg: 'kakao',
            pay_method: 'kakaopay',
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: totalPrice,
            name: '아임포트 결제 데이터 시험',
            buyer_name: buyerInfo.name,
            buyer_tel: buyerInfo.phoneNumber,
            buyer_email: buyerInfo.email,
            buyer_addr: buyerInfo.address,
            buyer_postcode: '06018',
        };

        IMP.request_pay(data, async (response) => {
            const { success, error_msg } = response;

            if (success) {
                try {
                    const db = getFirestore();

                    for (const item of shoppingCartItem) {
                        const productDocRef = doc(db, 'Game', item.gameId);
                        const productDoc = await getDoc(productDocRef);

                        if (productDoc.exists()) {
                            const currentStock = productDoc.data().재고수량;
                            const newStock = Number(currentStock) - item.quantity;
                            if (newStock < 0) {
                                alert('재고가 부족하여 결제에 실패했습니다.');
                                return;
                            }

                            await updateDoc(productDocRef, { 재고수량: newStock });

                            const orderDocRef = doc(db, 'Order', data.merchant_uid);
                            await setDoc(orderDocRef, {
                                주문번호: data.merchant_uid,
                                주문상품: orderInfo,
                                주문일시: new Date().toISOString(),
                                구매자: buyerInfo.name,
                                주소: buyerInfo.address,
                                uid: uid,
                                uploadUids: uploadUids,
                            });
                        }
                    }

                    alert('결제 성공');
                    localStorage.removeItem('cartState');
                    handleCartModal(false);
                } catch (error) {
                    console.error('Error updating product stock:', error);
                    alert('결제 성공, 상품 재고 업데이트 실패');
                }
            } else {
                alert(`결제 실패: ${error_msg}`);
            }
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const formFields = [
        { id: 'name', label: '성함', type: 'text', required: true },
        { id: 'email', label: '이메일', type: 'email', required: true },
        { id: 'address', label: '상품을 받을 주소', type: 'text', required: true },
        { id: 'phoneNumber', label: '연락처', type: 'tel', required: true },
    ];

    return (
        <div className=" w-[50vw] min-w-[400px] h-[70vh] bg-white rounded-md px-8 py-2">
            <p className="flex justify-end text-2xl" onClick={(prev) => handleCartModal(!prev)}>
                x
            </p>
            <h2 className="text-3xl text-center mb-8">구매 확인</h2>

            {formFields.map((field) => (
                <div key={field.id} className="flex flex-col mb-5">
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={buyerInfo[field.id]}
                        onChange={handleChange}
                        required={field.required}
                        className="border h-8 rounded-sm px-3"
                    />
                </div>
            ))}
            <div className="flex justify-center">
                <button onClick={onClickPayment} className=" bg-yellow-400 text-white rounded-md w-[300px] h-[50px] ">
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default BuyerInfo;

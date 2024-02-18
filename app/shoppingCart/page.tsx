'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import UseAuthVerification from '../../Hooks/UseAuthVerification';

export default function ShoppingCart() {
    UseAuthVerification();
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
                <tbody>
                    <tr>
                        <td>
                            <input checked="" id="item1" onChange={undefined} type="checkbox" />
                        </td>
                        <td>
                            <div className="flex space-x-4 items-center">
                                <img
                                    alt="상품 이미지"
                                    className="h-20 w-20 object-cover rounded-md"
                                    height="80"
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: '80/80',
                                        objectFit: 'cover',
                                    }}
                                    width="80"
                                />
                                <div>
                                    <p className="font-medium">피파 24</p>
                                    <p className="text-sm text-gray-500">상품코드: 1</p>
                                </div>
                            </div>
                        </td>
                        <td>1개</td>
                        <td>100,000원</td>
                        <td>100,000원</td>
                        <td></td>
                        <td>
                            <button className="text-sm">삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <button className="border">선택 삭제</button>
                    <button className="border ml-2">선택 재주문</button>
                </div>
                <div className="text-right">
                    <div className="text-lg font-medium">총 5개 상품금액</div>
                    <div className="text-2xl font-bold mt-2">1,000,000원</div>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className="border">선택 상품 주문</button>
                <button className="bg-[#bd1e59] text-white ml-2">전체 상품 주문</button>
            </div>
        </div>
    );
}

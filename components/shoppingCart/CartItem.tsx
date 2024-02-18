/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CartItem = () => {
    return (
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
    );
};

export default CartItem;

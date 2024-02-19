/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

const CartItem = ({ item }) => {
    return (
        <tbody>
            <tr>
                <td>
                    <input checked="" id={`item${item.id}`} onChange={undefined} type="checkbox" />
                </td>
                <td>
                    <div className="flex space-x-4 items-center">
                        <img
                            alt="상품 이미지"
                            className="h-20 w-20 object-cover rounded-md"
                            height="80"
                            src={item.thumbnail} // 상품 이미지 경로를 동적으로 설정
                            style={{
                                aspectRatio: '80/80',
                                objectFit: 'cover',
                            }}
                            width="80"
                        />
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                <Link href={`/detail/${item.genre}/${item.gameId}`}>해당상품 페이지 </Link>
                            </p>
                        </div>
                    </div>
                </td>
                <td>{item.quantity}개</td>
                <td>{item.price.toLocaleString()}원</td>
                <td>{(item.price * item.quantity).toLocaleString()}원</td>
                <td></td>
                <td>
                    <button className="text-sm">삭제</button>
                </td>
            </tr>
        </tbody>
    );
};

export default CartItem;

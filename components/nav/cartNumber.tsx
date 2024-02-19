'use client';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartItemCountState, isDropCart } from '../../recoil/atoms/recoilAtoms';
import CartDrop from './CartDrop';

const CartNumber = () => {
    const cartItemCount = useRecoilState(cartItemCountState);
    const [isDropOn, setIsDropOn] = useRecoilState(isDropCart);
    return (
        <>
            <div
                onClick={() => {
                    setIsDropOn(!isDropOn);
                }}
                className="flex"
            >
                <p>장바구니 </p>
                <p>{cartItemCount[0].length}</p>
            </div>
            {isDropOn && <CartDrop />}
        </>
    );
};

export default CartNumber;

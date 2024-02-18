'use client';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartItemCountState } from '../../recoil/atoms/recoilAtoms';
import CartDrop from './CartDrop';

const CartNumber = () => {
    const cartItemCount = useRecoilState(cartItemCountState);
    const [isDropOn, setIsDropOn] = useState(false);
    return (
        <div
            onClick={() => {
                setIsDropOn(!isDropOn);
            }}
            className="flex"
        >
            <p>장바구니 </p>
            <p>{cartItemCount[0].length}</p>
            {isDropOn && <CartDrop />}
        </div>
    );
};

export default CartNumber;

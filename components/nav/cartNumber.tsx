'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { cartItemCountState } from '../../recoil/atoms/recoilAtoms';

const CartNumber = () => {
    const cartItemCount = useRecoilState(cartItemCountState);
    return <p>{cartItemCount[0].length}</p>;
};

export default CartNumber;

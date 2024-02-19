/* eslint-disable @next/next/no-img-element */
// CartDrawer.js

import React from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/atoms/recoilAtoms';

const CartDrawer = ({ isOpen, onClose }) => {
    const [cart] = useRecoilState(cartState);

    return (
        <div
            className={`cart-drawer ${
                isOpen ? 'open' : ''
            } absolute top-0 right--40 w-[250px] h-[400px] overflow-scroll bg-slate-400`}
        >
            <div className="cart-header ">
                <h2>장바구니</h2>
                <button onClick={onClose}>닫기</button>
            </div>
            <div className="cart-items">
                {cart.map((item, index) => (
                    <div key={index} className="cart-item bg-slate-300">
                        <p>{item.name}</p>
                        <p>수량: {item.quantity}</p>
                        <p>총 가격: ${item.price * item.quantity}</p>
                    </div>
                ))}
            </div>

            {/* <div className=" absolute left-0 top-10 bg-slate-500">
                <div className="flex items-start">
                    <LayoutGridIcon className="h-6 w-6" />
                    <div className="ml-4">
                        <div>Inventory</div>
                        <div>Manage your items</div>
                    </div>
                </div>
                <div className="grid gap-6 pt-6">
                    <div className="flex items-center gap-4">
                        <img
                            alt="Image"
                            className="rounded-lg"
                            height={40}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: '40/40',
                                objectFit: 'cover',
                            }}
                            width={40}
                        />
                        <div className="grid gap-1.5">
                            <div className="line-clamp-1">Cotton T-Shirt</div>
                            <div>SKU: 123456</div>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default CartDrawer;

function LayoutGridIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    );
}

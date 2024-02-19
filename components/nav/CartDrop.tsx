/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRecoilState } from 'recoil';
import { cartState, isDropCart } from '../../recoil/atoms/recoilAtoms';

const CartDrawer = () => {
    const [cart, setCart] = useRecoilState(cartState);
    const [isDropOn, setIsDropOn] = useRecoilState(isDropCart);

    const handleDelete = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem('cartState', JSON.stringify(updatedCart));
    };

    return (
        <div className={`absolute top-0 right--40 w-[250px] h-[400px] overflow-scroll bg-slate-400`}>
            <div className="cart-header flex justify-between mb-5 px-2 py-1">
                <h2>장바구니</h2>
                <button onClick={() => setIsDropOn(!isDropOn)}>닫기</button>
            </div>
            <div className="cart-items flex flex-col">
                {cart.map((item, index) => (
                    <div key={index} className=" flex">
                        <div className="cart-item bg-slate-300 w-[80%] flex-col">
                            <p>{item.name}</p>
                            <p>수량: {item.quantity}</p>
                            <p>총 가격: ${item.price * item.quantity}</p>
                        </div>
                        <div className="ml-auto flex flex-col items-center gap-2">
                            <button>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartDrawer;

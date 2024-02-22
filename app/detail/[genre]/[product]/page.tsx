'use client';
import useFileData from '@/Hooks/UseFileData';
import UseFileDataRecommand from '@/Hooks/UseFileDataRecommand';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState, isDropCart } from '../../../../recoil/atoms/recoilAtoms';

export default function DetailPage() {
    const videoQuery = usePathname();
    const [cart, setCart] = useRecoilState(cartState);
    const [quantity, setQuantity] = useState<number>(0);
    const [isDropOn, setIsDropOn] = useRecoilState(isDropCart);

    const productIdMatch = videoQuery.match(/\/detail\/([^\/]+)\/([^\/]+)/);

    const encodedGenre = productIdMatch ? decodeURIComponent(productIdMatch[1]) : null;
    const originalProductId = productIdMatch ? decodeURIComponent(productIdMatch[2]) : null;

    const productInfo = useFileData(originalProductId);

    const gameData = productInfo?.gameData;

    const [recommandProducts, setRecommandProducts] = useState(null);

    useEffect(() => {
        const fetchRecommandProducts = async () => {
            const products = await UseFileDataRecommand(encodedGenre);
            setRecommandProducts(products);
        };

        fetchRecommandProducts();
    }, [encodedGenre]);

    if (!productInfo || recommandProducts === null) {
        return <div>Loading...</div>;
    }

    const addToCart = (product) => {
        setCart([...cart, product]);
        alert('장바구니에 추가했습니다.');

        localStorage.setItem('cartState', JSON.stringify([...cart, product]));
    };

    const storedCart = localStorage.getItem('cartState');
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    const isInCart = parsedCart.find((item) => item.name === gameData.게임명);

    const DropCart = () => {
        setIsDropOn(!isDropOn);
    };

    return (
        <>
            <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
                <div className="flex flex-col gap-2 items-start">
                    <h1 className="font-bold text-3xl lg:text-4xl">{gameData.게임명}</h1>
                    <div>
                        <p>{gameData.장르}</p>
                    </div>
                    <img src={productInfo && productInfo.thumbnailURL} alt="썸네일" />

                    <div className="text-4xl font-bold">${gameData.price}</div>
                    <p className="text-sm text-gray-500">잔여수량: {gameData['재고수량']}</p>
                </div>
                <div className="grid gap-4 md:gap-10 mt-12">
                    <div className="px-2 py-1 gap-4 text-sm leading-loose bg-slate-200 rounded-md h-[200px]">
                        <h3 className="text-2xl font-bold mb-2">게임 소개</h3>
                        <p>{gameData.게임소개}</p>
                    </div>
                    <div className="flex justify-between gap-2 min-[400px]:flex-row">
                        <div className="">
                            수량
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-[50px] ml-5"
                            />
                        </div>

                        <button
                            onClick={() =>
                                !isInCart
                                    ? addToCart({
                                          name: gameData.게임명,
                                          price: gameData.price,
                                          genre: gameData.장르,
                                          gameId: gameData.gameId,
                                          quantity: quantity,
                                          thumbnail: productInfo.thumbnailURL,
                                          gameDetailPage: `/detail/${gameData.장르}/${gameData.gameId}`,
                                          uploadUser: gameData.uploadUser,
                                      })
                                    : DropCart()
                            }
                        >
                            {isInCart ? '장바구니 보기' : 'Add to cart'}
                        </button>
                        <button className="flex">❤️ Add to wishlist</button>
                    </div>
                </div>
            </div>
            <div className="pl-12">
                <h2 className="text-4xl font-bold p-4 mt-12">관련상품</h2>
                <section className="recommandProduct grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:p-6">
                    {recommandProducts.map((recommandProduct, index) => {
                        return (
                            <div
                                key={index}
                                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
                            >
                                <Link
                                    className=" inset-0"
                                    href={`/detail/${recommandProduct.gameData.장르}/${recommandProduct.gameData.gameId}`}
                                >
                                    <span className="sr-only">View</span>

                                    <img
                                        alt={`Product ${index + 1}`}
                                        className="object-cover w-full h-64"
                                        height={400}
                                        src={recommandProduct.thumbnailURL || '/placeholder.svg'}
                                        style={{
                                            aspectRatio: '500/400',
                                            objectFit: 'cover',
                                        }}
                                        width={500}
                                    />
                                    <div className="bg-white p-4">
                                        <h3 className="font-bold text-xl">{recommandProduct.gameData.게임명}</h3>
                                        <p className="text-sm text-gray-500">{recommandProduct.gameData.장르}</p>
                                        <h4 className="font-semibold text-lg md:text-xl">{`$ ${recommandProduct.gameData.price}`}</h4>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </section>
            </div>
        </>
    );
}

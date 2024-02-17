'use client';
import useFileData from '@/Hooks/UseFileData';
import UseFileDataRecommand from '@/Hooks/UseFileDataRecommand';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailPage() {
    const videoQuery = usePathname();

    const productIdMatch = videoQuery.match(/\/detail\/([^\/]+)\/([^\/]+)/);

    // Extracting the encoded genre and the original productId from the URL
    const encodedGenre = productIdMatch ? decodeURIComponent(productIdMatch[1]) : null;
    const originalProductId = productIdMatch ? decodeURIComponent(productIdMatch[2]) : null;

    // const productId = decodeURIComponent(videoQuery)?.replace(/^.*\/detail\//, '');

    const productInfo = useFileData(originalProductId);
    const gameData = productInfo?.gameData;

    // Use useEffect to fetch recommandProducts when the component mounts
    const [recommandProducts, setRecommandProducts] = useState(null);

    useEffect(() => {
        const fetchRecommandProducts = async () => {
            const products = await UseFileDataRecommand(encodedGenre);
            setRecommandProducts(products);
        };

        fetchRecommandProducts();
    }, [encodedGenre]);

    // Wait for both productInfo and recommandProducts to be available
    if (!productInfo || recommandProducts === null) {
        return <div>Loading...</div>;
    }

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
                    <div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center">
                                <img
                                    alt="Product Image 1"
                                    className="object-cover rounded-lg"
                                    height={100}
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: '100/100',
                                        objectFit: 'cover',
                                    }}
                                    width={100}
                                />
                                <p className="text-sm text-center">Product Info 1</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    alt="Product Image 2"
                                    className="object-cover rounded-lg"
                                    height={100}
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: '100/100',
                                        objectFit: 'cover',
                                    }}
                                    width={100}
                                />
                                <p className="text-sm text-center">Product Info 2</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    alt="Product Image 3"
                                    className="object-cover rounded-lg"
                                    height={100}
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: '100/100',
                                        objectFit: 'cover',
                                    }}
                                    width={100}
                                />
                                <p className="text-sm text-center">Product Info 3</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 py-1 gap-4 text-sm leading-loose bg-slate-200 rounded-md h-[200px]">
                        <h3 className="text-2xl font-bold mb-2">게임 소개</h3>
                        <p>{gameData.게임소개}</p>
                    </div>
                    <div className="flex justify-between gap-2 min-[400px]:flex-row">
                        <button>Add to cart</button>
                        <button className="flex">❤️ Add to wishlist</button>
                    </div>
                </div>
            </div>
            <div className="pl-12">
                <h2 className="text-4xl font-bold p-4 mt-12">관련상품</h2>
                <section className="recommandProduct grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:p-6">
                    {recommandProducts.map((recommandProduct, index) => {
                        console.log(recommandProduct);
                        return (
                            <div
                                key={index}
                                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
                            >
                                <Link
                                    className="absolute inset-0 z-10"
                                    href={`/detail/${recommandProduct.gameData.장르}/${recommandProduct.gameData.gameId}`}
                                >
                                    <span className="sr-only">View</span>
                                </Link>
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
                            </div>
                        );
                    })}
                </section>
            </div>
        </>
    );
}

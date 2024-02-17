'use client';
import useFileData from '@/Hooks/UseFileData';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DetailPage() {
    const videoQuery = usePathname();
    const productId = decodeURIComponent(videoQuery)?.replace(/^.*\/detail\//, '');

    const productInfo = useFileData(productId);

    // 데이터 수신이 완료될때까지 대기
    if (!productInfo) {
        return <div>Loading...</div>;
    }

    const gameData = productInfo?.gameData;

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
                        <button className="flex">
                            <HeartIcon className="w-4 h-4 mr-2" />
                            Add to wishlist
                        </button>
                    </div>
                </div>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <Link className="absolute inset-0 z-10" href="#">
                        <span className="sr-only">View</span>
                    </Link>
                    <img
                        alt="Product 1"
                        className="object-cover w-full h-64"
                        height={400}
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '500/400',
                            objectFit: 'cover',
                        }}
                        width={500}
                    />
                    <div className="bg-white p-4 dark:bg-gray-950">
                        <h3 className="font-bold text-xl">Classic Leather Shoes</h3>
                        <p className="text-sm text-gray-500">Elegant and comfortable</p>
                        <h4 className="font-semibold text-lg md:text-xl">$59.99</h4>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <Link className="absolute inset-0 z-10" href="#">
                        <span className="sr-only">View</span>
                    </Link>
                    <img
                        alt="Product 2"
                        className="object-cover w-full h-64"
                        height={400}
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '500/400',
                            objectFit: 'cover',
                        }}
                        width={500}
                    />
                    <div className="bg-white p-4 dark:bg-gray-950">
                        <h3 className="font-bold text-xl">Designer Handbag</h3>
                        <p className="text-sm text-gray-500">Fashion statement</p>
                        <h4 className="font-semibold text-lg md:text-xl">$89.99</h4>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <Link className="absolute inset-0 z-10" href="#">
                        <span className="sr-only">View</span>
                    </Link>
                    <img
                        alt="Product 3"
                        className="object-cover w-full h-64"
                        height={400}
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '500/400',
                            objectFit: 'cover',
                        }}
                        width={500}
                    />
                    <div className="bg-white p-4 dark:bg-gray-950">
                        <h3 className="font-bold text-xl">Wireless Earbuds</h3>
                        <p className="text-sm text-gray-500">Crystal clear audio</p>
                        <h4 className="font-semibold text-lg md:text-xl">$69.99</h4>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <Link className="absolute inset-0 z-10" href="#">
                        <span className="sr-only">View</span>
                    </Link>
                    <img
                        alt="Product 4"
                        className="object-cover w-full h-64"
                        height={400}
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '500/400',
                            objectFit: 'cover',
                        }}
                        width={500}
                    />
                    <div className="bg-white p-4 dark:bg-gray-950">
                        <h3 className="font-bold text-xl">Vintage Pocket Watch</h3>
                        <p className="text-sm text-gray-500">Antique charm</p>
                        <h4 className="font-semibold text-lg md:text-xl">$79.99</h4>
                    </div>
                </div>
            </section>
        </>
    );
}

function HeartIcon(props) {
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}

function StarIcon(props) {
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

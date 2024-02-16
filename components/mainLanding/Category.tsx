/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Category(props) {
    const { title, items } = props;
    return (
        <div className="px-4 md:px-6 lg:px-8 pb-6">
            <div className="grid gap-6 lg:gap-12 items-start max-w-6xl mx-auto">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <nav className="flex ml-auto">
                        <Link className="ml-4 font-medium underline" href="#">
                            더보기
                        </Link>
                    </nav>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-2">
                        <Link className="font-semibold" href="#">
                            <img
                                alt="Image"
                                className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                height={180}
                                src="/placeholder.svg"
                                width={180}
                            />
                            Acme Circles T-Shirt
                        </Link>
                        <div className="font-semibold">$99</div>
                        <div className="text-sm not-italic">by Acme Apparel</div>
                        <div className="text-sm">T-Shirts</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link className="font-semibold" href="#">
                            <img
                                alt="Image"
                                className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                height={180}
                                src="/placeholder.svg"
                                width={180}
                            />
                            WhimsiMug: Sip in Style and Magic
                        </Link>
                        <div className="font-semibold">$99</div>
                        <div className="text-sm not-italic">by Acme Apparel</div>
                        <div className="text-sm">Mugs</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link className="font-semibold" href="#">
                            <img
                                alt="Image"
                                className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                height={180}
                                src="/placeholder.svg"
                                width={180}
                            />
                            Elegance Watch: Timeless Beauty
                        </Link>
                        <div className="font-semibold">$99</div>
                        <div className="text-sm not-italic">by Acme Timepieces</div>
                        <div className="text-sm">Watches</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link className="font-semibold" href="#">
                            <img
                                alt="Image"
                                className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                                height={180}
                                src="/placeholder.svg"
                                width={180}
                            />
                            Sparkle Shoes: Walk in Glam
                        </Link>
                        <div className="font-semibold">$99</div>
                        <div className="text-sm not-italic">by Acme Footwear</div>
                        <div className="text-sm">Shoes</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChevronLeftIcon(props) {
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
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ChevronRightIcon(props) {
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
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

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

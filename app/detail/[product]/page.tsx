/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tyTMe4RKwIL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { label } from "@/components/ui/label"
// import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
// import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
import Link from 'next/link';

export default function Component() {
    return (
        <>
            <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
                <div className="flex flex-col gap-2 items-start">
                    <h1 className="font-bold text-3xl lg:text-4xl">
                        DeCalComani Prism T-Shirt: The Cozy Chromatic Blend
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        </div>
                    </div>
                    <div>
                        <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
                    </div>
                    <div className="text-4xl font-bold">$99</div>
                    <p className="text-sm text-gray-500">Remaining stock: 15</p>
                </div>
                <div className="grid gap-4 md:gap-10">
                    <form className="grid gap-4 md:gap-10">
                        <div className="grid gap-2">
                            <label className="text-base" htmlFor="color">
                                Color
                            </label>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-base" htmlFor="quantity">
                                Quantity
                            </label>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <button>Add to cart</button>
                            <button>
                                <HeartIcon className="w-4 h-4 mr-2" />
                                Add to wishlist
                            </button>
                        </div>
                    </form>
                    <div className="grid gap-4 text-sm leading-loose">
                        <p>
                            Introducing the DeCalComani Prism T-Shirt, a perfect blend of style and comfort for the
                            modern individual. This tee is crafted with a meticulous composition of 60% combed ringspun
                            cotton and 40% polyester jersey, ensuring a soft and breathable fabric that feels gentle
                            against the skin.
                        </p>
                        <p>
                            The design of the DeCalComani Prism T-Shirt is as striking as it is comfortable. The shirt
                            features a unique prism-inspired pattern that adds a modern and eye-catching touch to your
                            ensemble.
                        </p>
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

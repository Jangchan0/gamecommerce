/* eslint-disable @next/next/no-img-element */
import React from 'react';

const ListProductBox = (props) => {
    const { item } = props;
    return (
        <div className="w-full bg-slate-200 rounded-md px-3 py-3 hover:scale-105 transition-all">
            <div>
                <div className="aspect-w-1 aspect-h-1 ">
                    <img
                        alt="Product Image"
                        className="object-cover"
                        height="300"
                        src={item.thumbnail}
                        style={{
                            aspectRatio: '300/300',
                            objectFit: 'contain',
                        }}
                        width="300"
                    />
                </div>
                <div className="my-4">
                    <h3 className="text-lg font-medium">{item.게임명}</h3>
                    <p className="mt-1 text-sm text-gray-500 overflow-hidden">{item.게임소개}</p>
                    <p className="mt-2 text-sm font-semibold">{item.price}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <button>Details</button>
                <button>Add to Cart</button>
            </div>
        </div>
    );
};

export default ListProductBox;

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();
    return (
        <h1
            className="title text-4xl mb-11 cursor-pointer"
            onClick={() => {
                router.push('/');
            }}
        >
            Geagul
        </h1>
    );
};

export default Logo;

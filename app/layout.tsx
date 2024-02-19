import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilRootWrapper from './recoilRootWrapper';
import QueryWrapper from './queryWrapper';
import Nav from '../components/nav/page';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'GeaGul',
    description: 'for gamer',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>
            </head>

            <QueryWrapper>
                <RecoilRootWrapper>
                    <body className={inter.className}>
                        <div className="flex">
                            <Nav />
                            <div className="flex-auto">{children}</div>
                        </div>
                    </body>
                </RecoilRootWrapper>
            </QueryWrapper>
        </html>
    );
}

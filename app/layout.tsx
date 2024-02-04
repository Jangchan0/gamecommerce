import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilRootWrapper from './recoilRootWrapper';
import QueryWrapper from './queryWrapper';

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
            <QueryWrapper>
                <RecoilRootWrapper>
                    <body className={inter.className}>{children}</body>
                </RecoilRootWrapper>
            </QueryWrapper>
        </html>
    );
}

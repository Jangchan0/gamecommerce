'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

interface queryWrapper {
    children: React.ReactNode;
}

const QueryWrapper = ({ children }: queryWrapper) => {
    const queryClient = new QueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryWrapper;

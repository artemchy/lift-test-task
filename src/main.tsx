import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/lib/styles/index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from '@/app/App';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
);

import { ErrorBoundary } from '@/shared/ui/components/ErrorBoundary/ErrorBoundary';
import { type ReactNode } from 'react';

interface ErrorBoundaryProviderProps {
    children: ReactNode;
}

export const ErrorBoundaryProvider = ({ children }: ErrorBoundaryProviderProps) => {
    return (
        <ErrorBoundary fallback={<div>Unexpected error occurred. Please reload the page.</div>}>
            {children}
        </ErrorBoundary>
    );
};

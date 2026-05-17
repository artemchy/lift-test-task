import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { USER_COUNTRY_STORAGE_KEY } from '../src/features/quiz/api/getUserCountry';
import { QUIZ_TRANSITION_DELAY_MS } from '../src/features/quiz/model/quizSteps.model';
import Quiz from '../src/features/quiz/ui/Quiz';

vi.mock('../src/features/quiz/api/getUserCountry', async () => {
    const actual = await vi.importActual<typeof import('../src/features/quiz/api/getUserCountry')>(
        '../src/features/quiz/api/getUserCountry',
    );
    return {
        ...actual,
        getUserCountry: vi.fn().mockResolvedValue('Poland'),
    };
});

const renderWithClient = (children: ReactNode) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
};

describe('Quiz flow', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem(USER_COUNTRY_STORAGE_KEY, 'Poland');
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('moves from the country question to the album question', () => {
        renderWithClient(<Quiz />);

        expect(screen.getByRole('heading', { name: 'Are you from Poland?' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /yes, i’m from poland/i }));

        act(() => {
            vi.advanceTimersByTime(QUIZ_TRANSITION_DELAY_MS);
        });

        expect(screen.getByRole('heading', { name: 'Ready to create your first photo album?' })).toBeInTheDocument();
    });
});

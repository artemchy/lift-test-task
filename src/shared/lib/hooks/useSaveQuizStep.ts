import type { IStoredQuizStep } from '@/features/quiz/model/types';
import { useCallback } from 'react';

export const useSaveQuizStep = () => {
    return useCallback((stepId: string, answer: string | null, title: string, imageSrc?: string) => {
        const stored = localStorage.getItem('quizHistory');
        const history: IStoredQuizStep[] = stored ? JSON.parse(stored) : [];

        const alreadyExists = history.some((step) => step.stepId === stepId);

        if (alreadyExists) return;

        const newStep: IStoredQuizStep = {
            stepId,
            answer,
            title,
            timestamp: Date.now(),
            ...(imageSrc ? { imageSrc } : {}),
        };

        localStorage.setItem('quizHistory', JSON.stringify([...history, newStep]));
    }, []);
};

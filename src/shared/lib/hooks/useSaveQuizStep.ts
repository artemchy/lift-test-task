import type { QuizStepId, YesNoAnswerType } from '@/features/quiz/model/types';
import { saveStepToLocalStorage } from '@/shared/lib/saveStepToLocalStorage';
import { useCallback } from 'react';

export const useSaveQuizStep = () => {
    return useCallback((stepId: QuizStepId, answer: YesNoAnswerType, title: string, imageSrc?: string) => {
        saveStepToLocalStorage(stepId, answer, title, imageSrc);
    }, []);
};

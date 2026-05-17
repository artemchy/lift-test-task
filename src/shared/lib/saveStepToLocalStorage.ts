import type { IStoredQuizStep, QuizStepId, YesNoAnswerType } from '@/features/quiz/model/types';
import { readJsonStorage, writeJsonStorage } from './storage';

export const QUIZ_HISTORY_STORAGE_KEY = 'quizHistory';

export const saveStepToLocalStorage = (
    stepId: QuizStepId,
    answer: YesNoAnswerType,
    title: string,
    imageSrc?: string,
) => {
    const storedHistory = readJsonStorage<unknown>(QUIZ_HISTORY_STORAGE_KEY, []);
    const history: IStoredQuizStep[] = Array.isArray(storedHistory) ? (storedHistory as IStoredQuizStep[]) : [];
    const alreadyExists = history.some((step) => step.stepId === stepId);

    if (alreadyExists) return false;

    const newStep = {
        stepId,
        answer,
        title,
        timestamp: Date.now(),
        ...(imageSrc ? { imageSrc } : {}),
    };

    return writeJsonStorage(QUIZ_HISTORY_STORAGE_KEY, [...history, newStep]);
};

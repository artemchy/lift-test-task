import { INITIAL_QUIZ_STEP_ID, quizStepsById } from '../model/quizSteps.model';
import type { IStoredQuizStep, QuizStepId, YesNoAnswer } from '../model/types';

const isQuizStepId = (value: unknown): value is QuizStepId => {
    return typeof value === 'string' && value in quizStepsById;
};

const isYesNoAnswer = (value: unknown): value is YesNoAnswer => {
    return value === 'yes' || value === 'no';
};

export const isStoredQuizStep = (value: unknown): value is IStoredQuizStep => {
    if (!value || typeof value !== 'object') return false;

    const candidate = value as Partial<IStoredQuizStep>;
    return (
        isQuizStepId(candidate.stepId) &&
        isYesNoAnswer(candidate.answer) &&
        typeof candidate.title === 'string' &&
        typeof candidate.timestamp === 'number'
    );
};

export const resolveInitialQuizStepId = (history: readonly unknown[]): QuizStepId => {
    const lastAnsweredStep = history.filter(isStoredQuizStep).at(-1);
    if (!lastAnsweredStep) return INITIAL_QUIZ_STEP_ID;

    const step = quizStepsById[lastAnsweredStep.stepId];
    const nextStep = step.buttons?.find((button) => button.value === lastAnsweredStep.answer)?.next;

    return nextStep ?? INITIAL_QUIZ_STEP_ID;
};

import { useState, useMemo, lazy, Suspense, useEffect } from 'react';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { QUIZ_TRANSITION_DELAY_MS, quizStepsById } from '../model/quizSteps.model';
import { replacePlaceholder } from '@/shared/lib/replacePlaceholder';
import { useQuery } from '@tanstack/react-query';
import { COUNTRY_FALLBACK_LABEL, getUserCountry, USER_COUNTRY_STORAGE_KEY } from '../api/getUserCountry';
import s from './Quiz.module.scss';
import type { IQuizButton, IQuizState } from '../model/types';
import { FirstStep, FourthStep, SecondStep, ThirdStep } from '@features/quiz/ui/steps';
import { Loader } from '@/shared/ui/components/Loader/Loader';
import { useSaveQuizStep } from '@/shared/lib/hooks/useSaveQuizStep';
import { readJsonStorage, readStorageValue, writeStorageValue } from '@/shared/lib/storage';
import { QUIZ_HISTORY_STORAGE_KEY } from '@/shared/lib/saveStepToLocalStorage';
import { resolveInitialQuizStepId } from '../lib/restoreQuizProgress';

const FinalStep = lazy(() => import('./steps/FinalStep/FinalStep'));

const Quiz = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [quizState, setQuizState] = useState<IQuizState>(() => ({
        currentStepId: resolveInitialQuizStepId(readJsonStorage<unknown[]>(QUIZ_HISTORY_STORAGE_KEY, [])),
        selected: null,
        key: null,
        isClicked: false,
    }));

    const saveQuizStep = useSaveQuizStep();
    const currentStep = quizStepsById[quizState.currentStepId];
    const { buttons, title, progress } = currentStep;

    const {
        data: detectedCountry,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['user-country'],
        queryFn: getUserCountry,
        staleTime: 1000 * 60 * 60 * 24,
        initialData: () => readStorageValue(USER_COUNTRY_STORAGE_KEY) || undefined,
    });

    useEffect(() => {
        if (detectedCountry) writeStorageValue(USER_COUNTRY_STORAGE_KEY, detectedCountry);
    }, [detectedCountry]);

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    const country = detectedCountry ?? COUNTRY_FALLBACK_LABEL;
    const processedTitle = replacePlaceholder(title, 'country', country);

    const processedButtons = useMemo(() => {
        if (!buttons) return [];
        return buttons.map((btn: IQuizButton) => ({
            ...btn,
            label: replacePlaceholder(btn.label, 'country', country),
        }));
    }, [buttons, country]);

    const handleClick = (btn: IQuizButton) => {
        if (!btn || quizState.isClicked) return;
        const { value, next } = btn || {};
        saveQuizStep(quizState.currentStepId, value, processedTitle);
        setQuizState((prev) => ({
            ...prev,
            selected: value,
            key: processedTitle,
            isClicked: true,
        }));

        setTimeout(() => {
            setQuizState((prev) => ({
                ...prev,
                currentStepId: next,
                selected: null,
                isClicked: false,
            }));
        }, QUIZ_TRANSITION_DELAY_MS);
    };

    const handleFileSelect = (file: File | null, setLoading: (value: boolean) => void) => {
        if (!file) return;
        setLoading(true);
        const previewUrl = URL.createObjectURL(file);
        setImageUrl(previewUrl);
        setQuizState((prev) => ({
            ...prev,
            currentStepId: 'q5',
            selected: null,
        }));
        setLoading(false);
    };

    if (isLoading && !detectedCountry && !isError) {
        return <Loader />;
    }

    return (
        <>
            <ProgressBar value={progress || 0} />
            <div className={s.wrapper}>
                <Suspense fallback={<Loader />}>
                    {quizState.currentStepId === 'q1' && (
                        <FirstStep
                            buttons={processedButtons}
                            selected={quizState.selected}
                            onClick={handleClick}
                            title={processedTitle}
                        />
                    )}
                    {quizState.currentStepId === 'q2' && (
                        <SecondStep
                            buttons={processedButtons}
                            selected={quizState.selected}
                            onClick={handleClick}
                            title={processedTitle}
                        />
                    )}
                    {quizState.currentStepId === 'q3' && <ThirdStep onFileSelect={handleFileSelect} />}
                    {quizState.currentStepId === 'q4' && <FourthStep title={processedTitle} />}
                    {quizState.currentStepId === 'q5' && <FinalStep imageUrl={imageUrl} title={processedTitle} />}
                </Suspense>
            </div>
        </>
    );
};

export default Quiz;

import { useState, useMemo, lazy, Suspense, useEffect } from 'react';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { quizSteps } from '../model/quizSteps.model';
import { replacePlaceholder } from '@/shared/lib/replacePlaceholder';
import { useQuery } from '@tanstack/react-query';
import { getUserCountry } from '../api/getUserCountry';
import s from './Quiz.module.scss';
import type { IQuizButton, IQuizState, YesNoAnswerType } from '../model/types';
import { FirstStep, SecondStep, FourStep, ThirdStep } from '@features/quiz/ui/steps';
import { Loader } from '@/shared/ui/components/Loader/Loader';
import { useSaveQuizStep } from '@/shared/lib/hooks/useSaveQuizStep';

const FinalStep = lazy(() => import('@features/quiz/ui/steps').then((mod) => ({ default: mod.FinalStep })));

const Quiz = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [quizState, setQuizState] = useState<IQuizState>({
        currentStepId: 'q1',
        selected: null,
        key: null,
        isClicked: false,
    });

    const saveQuizStep = useSaveQuizStep();

    const { buttons, title, progress } = quizSteps.find((s) => s.id === quizState.currentStepId)!;

    const {
        data: country,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['user-country'],
        queryFn: getUserCountry,
        staleTime: 1000 * 60 * 60 * 24,
        initialData: () => localStorage.getItem('userCountry') || undefined,
    });

    useEffect(() => {
        if (country) localStorage.setItem('userCountry', country);
    }, [country]);

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

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
            selected: value as YesNoAnswerType,
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
        }, 750);
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

    if (isLoading) {
        return <div>Loading initial data...</div>;
    }

    if (error) {
        return <div>Error occurred: {error.message}</div>;
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
                    {quizState.currentStepId === 'q4' && <FourStep title={processedTitle} />}
                    {quizState.currentStepId === 'q5' && <FinalStep imageUrl={imageUrl} title={processedTitle} />}
                </Suspense>
            </div>
        </>
    );
};

export default Quiz;

import type { FC } from 'react';
import { QuizTitle } from '../../components/QuizTitle/QuizTitle';
import type { BaseStepProps } from '@/features/quiz/model/types';

const FirstStep: FC<BaseStepProps> = ({ title }) => {
    return (
        <>
            <img src="/hand.svg" loading="lazy" alt="shaking hand icon" />
            <QuizTitle title={title} />
        </>
    );
};

export default FirstStep;

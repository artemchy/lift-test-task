import type { FC } from 'react';
import type { BaseStepProps } from '@/features/quiz/model/types';
import { QuizTitle } from '../../components/QuizTitle/QuizTitle';

const FourthStep: FC<BaseStepProps> = ({ title }) => {
    return (
        <>
            <img src="/hand.svg" loading="lazy" alt="Shaking hand icon" />
            <QuizTitle title={title} />
        </>
    );
};

export default FourthStep;

import type { FC } from 'react';
import type { FinalStepProps } from '@/features/quiz/model/types';
import { Preview } from '../../components/UploadedImage/Preview';
import { QuizTitle } from '../../components/QuizTitle/QuizTitle';

const FinalStep: FC<FinalStepProps> = ({ imageUrl, title }) => {
    return (
        <>
            <img src="/party.svg" loading="lazy" alt="uploaded succesfully" />
            <QuizTitle title={title} />
            <Preview imageUrl={imageUrl} />
        </>
    );
};

export default FinalStep;

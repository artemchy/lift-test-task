import type { FC } from 'react';
import { QuizTitle } from '../../components/QuizTitle/QuizTitle';
import { YesNoButtons } from '../../components/YesNoButtons/YesNoButtons';
import type { AnswerStepProps } from '@/features/quiz/model/types';

const SecondStep: FC<AnswerStepProps> = ({ buttons, selected, onClick, title }) => {
    return (
        <>
            <QuizTitle title={title} />
            <YesNoButtons buttons={buttons} selected={selected} onClick={onClick} />
        </>
    );
};

export default SecondStep;

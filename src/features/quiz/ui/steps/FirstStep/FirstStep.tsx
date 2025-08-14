import { type FC } from 'react';
import { QuizTitle } from '../../components/QuizTitle/QuizTitle';
import { YesNoButtons } from '../../components/YesNoButtons/YesNoButtons';
import type {StepWithButtonsProps } from '@/features/quiz/model/types';

const FirstStep: FC<StepWithButtonsProps> = ({ buttons, selected, onClick, title }) => {
    return (
        <>
            <QuizTitle title={title} />
            <YesNoButtons buttons={buttons} selected={selected} onClick={onClick} />
        </>
    );
};

export default FirstStep;

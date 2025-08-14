import { memo, type FC } from 'react';
import s from './QuizTitle.module.scss';
import type { AnswerStepProps } from '@/features/quiz/model/types';

export const QuizTitle: FC<Pick<AnswerStepProps, 'title'>> = memo(({ title }) => {
    return <h2 className={s.title}>{title}</h2>;
});

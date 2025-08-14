import { memo, type FC } from 'react';
import clsx from 'clsx';
import s from './YesNoButtons.module.scss';
import type { StepWithButtonsProps } from '@/features/quiz/model/types';

export const YesNoButtons: FC<Omit<StepWithButtonsProps, 'title'>> = memo(({ buttons, selected, onClick }) => {
    return (
        <div className={s.wrapper}>
            {buttons.map((btn) => {
                const isPicked = selected === btn.value;

                return (
                    <button
                        key={btn.value}
                        onClick={() => onClick(btn)}
                        className={clsx(s.button, { [s.active]: isPicked })}
                    >
                        <span className={clsx(s.ratio, { [s.active]: isPicked })} />
                        {btn.label}
                    </button>
                );
            })}
        </div>
    );
});

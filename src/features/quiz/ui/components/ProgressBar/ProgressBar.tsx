import { memo } from 'react';
import s from './ProgressBar.module.scss';

interface Props {
    value: number;
}

export const ProgressBar = memo(({ value }: Props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.label}>{value}%</div>
            <div className={s.track}>
                <div className={s.fill} style={{ transform: `scaleX(${value / 100})` }} />
            </div>
        </div>
    );
});

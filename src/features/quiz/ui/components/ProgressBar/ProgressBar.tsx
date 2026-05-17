import { memo } from 'react';
import s from './ProgressBar.module.scss';

interface Props {
    value: number;
}

export const ProgressBar = memo(({ value }: Props) => {
    const safeValue = Math.min(100, Math.max(0, value));

    return (
        <div
            className={s.wrapper}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={safeValue}
        >
            <div className={s.label}>{safeValue}%</div>
            <div className={s.track}>
                <div className={s.fill} style={{ transform: `scaleX(${safeValue / 100})` }} />
            </div>
        </div>
    );
});

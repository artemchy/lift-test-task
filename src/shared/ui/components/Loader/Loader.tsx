import type { FC } from 'react';
import s from './Loader.module.scss';

export const Loader: FC = () => {
    return (
        <div className={s.loaderWrapper} role="status" aria-label="Loading">
            <div className={s.spinner} aria-hidden></div>
        </div>
    );
};
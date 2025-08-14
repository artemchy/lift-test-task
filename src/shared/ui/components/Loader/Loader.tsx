import type { FC } from 'react';
import s from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={s.loaderWrapper}>
      <div className={s.spinner}></div>
    </div>
  );
};
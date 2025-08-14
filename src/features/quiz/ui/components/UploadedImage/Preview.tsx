import type { FC } from 'react';
import s from './UploadedImage.module.scss';
import type { FinalStepProps } from '@/features/quiz/model/types';

export const Preview: FC<Omit<FinalStepProps, 'title'>> = ({ imageUrl }) => {
    if (!imageUrl) return null;

    return <img className={s.image} src={imageUrl} alt="Uploaded image" />;
};

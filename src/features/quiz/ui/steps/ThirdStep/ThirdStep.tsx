import type { FC } from 'react';
import UploadImage from '../../components/UploadImage/UploadImage';
import type { ThirdStepProps } from '@/features/quiz/model/types';

const ThirdStep: FC<Pick<ThirdStepProps, 'onFileSelect'>> = ({ onFileSelect }) => {
    return (
        <>
            <UploadImage onFileSelect={onFileSelect} />
        </>
    );
};

export default ThirdStep;

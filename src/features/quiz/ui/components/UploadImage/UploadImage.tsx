import { useRef, useState, type FC } from 'react';
import s from './UploadImage.module.scss';
import clsx from 'clsx';
import type { ThirdStepProps } from '@/features/quiz/model/types';

const UploadImage: FC<ThirdStepProps> = ({ onFileSelect }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState(false);

    const handleClick = () => inputRef.current?.click();

    const logError = (message: string) => {
        setError(true);
        setLoading(false);
        console.log(message);
    };

    const handleFile = (file: File) => {
        const validTypes = ['image/png', 'image/jpeg'];
        const maxSize = 10 * 1024 * 1024;
        // Simulated delay to demonstrate the loading indicator, it leads to an extra re-render.
        setTimeout(() => {
            if (!validTypes.includes(file.type)) {
                logError('File must be PNG or JPG');
                return;
            }
            if (file.size > maxSize) {
                logError('File size must be less than 10MB');
                return;
            }
            setError(false);
            onFileSelect?.(file, setLoading);
        }, 750);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDragLeave = () => setDragOver(false);

    return (
        <div className={s.container}>
            <div
                className={clsx(s.dropZone, { [s.dragOver]: dragOver, [s.error]: error, [s.isLoading]: isLoading })}
                onClick={handleClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
            >
                <input ref={inputRef} type="file" accept="image/*" onChange={onChange} style={{ display: 'none' }} />
                {isLoading ? (
                    <div className={s.spinner}></div>
                ) : (
                    <img className={s.uploadIcon} src="/drag.svg" alt="upload icon" />
                )}
                <p className={s.label}>Upload an image or drag and drop here</p>
                {error && <p className={s.errorMessage}>Error, please try again</p>}
            </div>

            <div className={s.hint}>PNG or JPG, 10mb max</div>
        </div>
    );
};

export default UploadImage;

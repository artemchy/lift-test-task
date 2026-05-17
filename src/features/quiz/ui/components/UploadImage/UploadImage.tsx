import { useEffect, useRef, useState, type FC } from 'react';
import s from './UploadImage.module.scss';
import clsx from 'clsx';
import type { ThirdStepProps } from '@/features/quiz/model/types';
import { UploadIcon } from '@/shared/ui/icons/UploadIcon/UploadIcon';
import { UPLOAD_FEEDBACK_DELAY_MS, validateUploadFile } from '@/features/quiz/lib/validateUploadFile';

const UploadImage: FC<ThirdStepProps> = ({ onFileSelect }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const timerRef = useRef<number | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = () => inputRef.current?.click();

    const showError = (message: string) => {
        setError(message);
        setLoading(false);
    };

    const handleFile = (file: File) => {
        setError(null);
        setLoading(true);

        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            const validationError = validateUploadFile(file);
            if (validationError) {
                showError(validationError);
                return;
            }
            setError(null);
            onFileSelect?.(file, setLoading);
        }, UPLOAD_FEEDBACK_DELAY_MS);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };

    const onDrop = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    const onDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDragLeave = () => setDragOver(false);

    return (
        <>
            <button
                type="button"
                className={clsx(s.dropZone, { [s.dragOver]: dragOver, [s.error]: error, [s.isLoading]: isLoading })}
                onClick={handleClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                aria-describedby="upload-hint upload-error"
                aria-busy={isLoading}
            >
                {isLoading ? <div className={s.spinner}></div> : <UploadIcon />}
                <p className={s.label}>Upload an image or drag and drop here</p>
                <p id="upload-error" className={clsx(s.errorMessage, { [s.error]: error })} role="status">
                    {error ?? 'Ready to upload'}
                </p>
            </button>
            <input ref={inputRef} className={s.input} type="file" accept="image/png,image/jpeg" onChange={onChange} />

            <div id="upload-hint" className={s.hint}>
                PNG or JPG, 10MB max
            </div>
        </>
    );
};

export default UploadImage;

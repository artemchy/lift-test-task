import { describe, expect, it } from 'vitest';
import { MAX_UPLOAD_SIZE_BYTES, validateUploadFile } from '../src/features/quiz/lib/validateUploadFile';

describe('validateUploadFile', () => {
    it('accepts jpeg and png images inside the size limit', () => {
        const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

        expect(validateUploadFile(file)).toBeNull();
    });

    it('rejects unsupported mime types', () => {
        const file = new File(['text'], 'note.txt', { type: 'text/plain' });

        expect(validateUploadFile(file)).toBe('File must be PNG or JPG.');
    });

    it('rejects files that are too large', () => {
        const oversizedFile = new File([new Uint8Array(MAX_UPLOAD_SIZE_BYTES + 1)], 'big.jpg', {
            type: 'image/jpeg',
        });

        expect(validateUploadFile(oversizedFile)).toBe('File size must be 10MB or less.');
    });
});

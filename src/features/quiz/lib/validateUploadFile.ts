export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'] as const;
export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
export const UPLOAD_FEEDBACK_DELAY_MS = 750;

const ACCEPTED_IMAGE_LABEL = 'PNG or JPG';
const MAX_UPLOAD_SIZE_LABEL = '10MB';

export const validateUploadFile = (file: File): string | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
        return `File must be ${ACCEPTED_IMAGE_LABEL}.`;
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        return `File size must be ${MAX_UPLOAD_SIZE_LABEL} or less.`;
    }

    return null;
};

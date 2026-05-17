export const readStorageValue = (key: string): string | null => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

export const writeStorageValue = (key: string, value: string): boolean => {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
};

export const readJsonStorage = <T>(key: string, fallback: T): T => {
    const value = readStorageValue(key);
    if (!value) return fallback;

    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
};

export const writeJsonStorage = <T>(key: string, value: T): boolean => {
    try {
        return writeStorageValue(key, JSON.stringify(value));
    } catch {
        return false;
    }
};

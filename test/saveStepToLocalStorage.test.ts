import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QUIZ_HISTORY_STORAGE_KEY, saveStepToLocalStorage } from '../src/shared/lib/saveStepToLocalStorage';

describe('saveStepToLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useRealTimers();
    });

    it('stores a quiz step once', () => {
        vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

        const firstSave = saveStepToLocalStorage('q1', 'yes', 'Are you from Poland?');
        const duplicateSave = saveStepToLocalStorage('q1', 'no', 'Are you from Poland?');
        const stored = JSON.parse(localStorage.getItem(QUIZ_HISTORY_STORAGE_KEY) ?? '[]');

        expect(firstSave).toBe(true);
        expect(duplicateSave).toBe(false);
        expect(stored).toEqual([
            {
                stepId: 'q1',
                answer: 'yes',
                title: 'Are you from Poland?',
                timestamp: Date.now(),
            },
        ]);
    });

    it('recovers from invalid stored JSON', () => {
        localStorage.setItem(QUIZ_HISTORY_STORAGE_KEY, '{broken');

        expect(saveStepToLocalStorage('q2', 'no', 'Ready?')).toBe(true);
        expect(JSON.parse(localStorage.getItem(QUIZ_HISTORY_STORAGE_KEY) ?? '[]')).toHaveLength(1);
    });
});

import { describe, expect, it } from 'vitest';
import { replacePlaceholder } from '../src/shared/lib/replacePlaceholder';

describe('replacePlaceholder', () => {
    it('replaces all matching placeholders', () => {
        expect(replacePlaceholder('Are you from %country? Yes, %country.', 'country', 'Poland')).toBe(
            'Are you from Poland? Yes, Poland.',
        );
    });
});

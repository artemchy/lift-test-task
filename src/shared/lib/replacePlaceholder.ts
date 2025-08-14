export function replacePlaceholder(template: string, key: string, value: string): string {
    const regex = new RegExp(`%${key}`, 'g');
    return template.replace(regex, value);
}

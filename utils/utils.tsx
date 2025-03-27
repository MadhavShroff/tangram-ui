/**
 * Converts a string to PascalCase.
 * Handles kebab-case, snake_case, camelCase, and space-separated strings.
 * @param str The string to convert
 * @returns The PascalCase string
 */
export const toPascalCase = (str: string): string => {
    if (!str) return '';
    
    // First normalize the string by replacing non-alphanumeric chars with spaces
    const normalized = str
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim();
    
    // Split by space and capitalize first letter of each word
    return normalized.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
        .join('');
};
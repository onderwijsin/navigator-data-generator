/**
 * Converts a string into a URL-friendly slug.
 * @param text - The input string to be slugified.
 * @returns The slugified string.
 */
export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with a single '-'
      .replace(/^-+|-+$/g, '');  // Remove leading and trailing hyphens
  }
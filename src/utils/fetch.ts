import { logger } from "../lib/use-errors";
import { Vendor } from "../types/utils";
/**
 * A utility function to safely execute asynchronous operations with error handling.
 * Logs errors and returns `null` if the operation fails.
 *
 * @template T - The type of the value returned by the asynchronous operation.
 * @param fn - A function that returns a promise to execute.
 * @param logContext - An object containing context for logging errors.
 * @param logContext.method - The name of the method or operation being executed.
 * @param logContext.id - An optional identifier for the operation (e.g., an ID related to the operation).
 * @returns A promise that resolves to the result of the operation, or `null` if an error occurs.
 *
 * @example
 * const result = await safeAsync(() => fetchData(), { method: 'fetchData', id: '123' });
 * if (result) {
 *   console.log('Data fetched successfully:', result);
 * } else {
 *   console.log('Failed to fetch data.');
 * }
 */
export async function safeAsync<T>(
    fn: () => Promise<T>,
    logContext: { method: string; id?: string, vendor: 'hovi' | 'kiesmbo' | 'unknown' }
): Promise<T | null> {
    try {
        return await fn();
    } catch (err) {
        logger.log(err as Error, logContext.method, logContext.id || 'unknown_id', logContext.vendor);
        return null;
    }
}
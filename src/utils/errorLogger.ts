type ErrorLog = {
    timestamp: number;
    message: string;
    stack?: string;
    /** The function name where the error occurred */
    functionName: string;
    /** The scope of the error, e.g. an item id, or some other value to target the root cause etc. */
    scope: string;
    vendor: 'kiesmbo' | 'hovi' | 'unknown';
};
  
export class ErrorLogger {
    private logs: ErrorLog[] = [];

    log(error: Error, functionName: string, scope: string, vendor: 'kiesmbo' | 'hovi' | 'unknown') {
        this.logs.push({
            timestamp: Date.now(),
            message: error?.message || 'Unknown error',
            stack: error.stack,
            functionName,
            scope,
            vendor
        });
    }

    getLogs(): ErrorLog[] {
        return this.logs;
    }

    clear() {
        this.logs = [];
    }
}
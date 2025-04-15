# Logger Utility

This project includes a simple error logging utility to help track and debug errors during data extraction and processing. The logger is implemented via the `ErrorLogger` class and is available as a singleton instance throughout the codebase.

## Usage

Import the logger from the `use-errors` module:

```typescript
import { logger } from '../lib/use-errors';
```

To log an error, use the log method:

```typescript
logger.log({
 error: Error,       // The JavaScript Error object
 functionName: String, // Name of the function or method where the error occurred
 scope: String,      // A string to identify the context (e.g., an item ID or operation)
 vendor: String      // The data source, e.g. 'hovi', 'kiesmbo', or 'unknown'
})
```

```typescript
try {
  // some code that may throw
} catch (err) {
  logger.log(err as Error, 'fetchData', '123', 'hovi');
}
```

### Retrieving Logs
You can retrieve all logged errors:

```typescript
const logs = logger.getLogs();
```

### Clearing Logs
You can retrieve all logged errors:
```typescript
logger.clear();
```


The logger is used throughout the codebase, especially in utility functions that interact with external APIs, to ensure errors are captured with useful context for debugging.


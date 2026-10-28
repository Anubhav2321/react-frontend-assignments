/**
 * Custom Redux Action Logger Middleware for development diagnostics.
 *
 * PRIVACY & COMPLIANCE RULES:
 * - Logs action types and sanitized metadata only.
 * - Does not dump raw student personal data (PII like student emails or personal contact info).
 * - Can be toggled on/off via the ENABLE_ACTION_LOGGING flag.
 */

export const ENABLE_ACTION_LOGGING = process.env.NODE_ENV !== 'production';

export const actionLoggerMiddleware = (storeAPI) => (next) => (action) => {
  if (!ENABLE_ACTION_LOGGING) {
    return next(action);
  }

  const timestamp = new Date().toLocaleTimeString();
  const actionType = action.type;

  // Mask or omit PII if action involves student mutations
  let sanitizedPayloadSummary = '';
  if (action.payload && typeof action.payload === 'object') {
    if ('studentId' in action.payload) {
      sanitizedPayloadSummary = `[Student: ${action.payload.studentId}]`;
    } else if (Array.isArray(action.payload)) {
      sanitizedPayloadSummary = `[Array length: ${action.payload.length}]`;
    }
  }

  // Format concise dev log
  if (typeof console !== 'undefined' && console.debug) {
    console.debug(`%c[Redux @ ${timestamp}] %c${actionType} ${sanitizedPayloadSummary}`, 'color: #6366f1; font-weight: bold;', 'color: #0f172a;');
  }

  return next(action);
};


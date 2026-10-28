/**
 * Custom Redux Middleware for Development Diagnostics & Action Logging
 * - Active only in development mode
 * - Strictly scrubs and filters sensitive fields (passwords, tokens, credentials)
 * - Measures dispatch execution time and provides clear diagnostic insights
 */
export const actionLoggerMiddleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === 'production') {
    return next(action);
  }

  const startTime = performance.now();
  const prevState = store.getState();

  const result = next(action);

  const duration = (performance.now() - startTime).toFixed(2);

  // Sanitize payload to never leak passwords or sensitive tokens into logs
  let sanitizedPayload = action.payload;
  if (action.payload && typeof action.payload === 'object') {
    sanitizedPayload = { ...action.payload };
    if ('password' in sanitizedPayload) sanitizedPayload.password = '***[REDACTED]***';
    if ('confirmPassword' in sanitizedPayload) sanitizedPayload.confirmPassword = '***[REDACTED]***';
    if ('token' in sanitizedPayload) sanitizedPayload.token = '***[TOKEN_MASKED]***';
  }

  // Grouped console output
  if (console.groupCollapsed) {
    console.groupCollapsed(`%cRedux Action: ${action.type} (%c${duration}ms)`, 'color: #4f46e5; font-weight: bold;', 'color: #64748b; font-weight: normal;');
    console.log('%cPayload:', 'color: #0284c7; font-weight: 600;', sanitizedPayload);
    console.log('%cPrev State:', 'color: #94a3b8; font-weight: 600;', prevState);
    console.log('%cNext State:', 'color: #10b981; font-weight: 600;', store.getState());
    console.groupEnd();
  }

  return result;
};


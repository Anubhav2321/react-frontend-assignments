import { useState, useEffect } from 'react';

/**
 * useDebounce Hook
 * Debouncing delays the execution of a function or state update 
 * until the user stops typing for a short period.
 * This is crucial for search inputs to prevent excessive API calls on every keystroke.
 * 
 * @param {any} value - The state value to debounce (e.g., search query)
 * @param {number} delay - The delay in milliseconds
 * @returns {any} The debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: clears the timeout if the value changes before the delay ends.
    // This ensures that the timer is reset on every new keystroke.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run effect if value or delay changes

  return debouncedValue;
}

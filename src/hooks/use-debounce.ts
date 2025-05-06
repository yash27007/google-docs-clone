import { useCallback, useRef } from "react";

/**
 * Custom hook to debounce a function call in React.
 * 
 * @param callback - The function to be debounced.
 * @param delay - The debounce delay in milliseconds (default is 500ms).
 * @returns A debounced version of the callback function.
 */
export function useDebounce<
  T extends (...args: Parameters<T>) => ReturnType<T> // Ensures callback type safety
>(callback: T, delay: number = 500) { // Default delay of 500ms
  // useRef is used to store the timeout ID across renders
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useCallback ensures the function is memoized and doesn't change on every render
  return useCallback(
    (...args: Parameters<T>) => { // Accepts the same parameters as the original callback
      // If there's an existing timeout, clear it to reset the timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to execute the callback after the specified delay
      timeoutRef.current = setTimeout(() => {
        callback(...args); // Execute the actual callback function
      }, delay);
    },
    [callback, delay] // Dependencies: Recompute only if `callback` or `delay` changes
  );
}
/**
 * What is Debouncing?
 * 
 * Debouncing is a technique used in programming to ensure that a function executes only after a certain delay following the last event that triggered it. This is especially useful when dealing with events that fire too frequently, such as user input, button clicks, or window resizing.
 * This hook implements debouncing to:
 * - Prevent excessive function calls (e.g., API requests while typing)
 * - Improve performance by reducing unnecessary operations
 * - Handle high-frequency events like window resizing or scrolling
 * 
 * Example usage:
 * ```
 * const debouncedSearch = useDebounce((query: string) => {
 *   searchAPI(query);
 * }, 300);
 * 
 * // In component:
 * onChange={(e) => debouncedSearch(e.target.value)}
 * ```
 * 
 * The function will only execute after the specified delay (default: 500ms)
 * of inactivity, preventing rapid successive calls.
 */

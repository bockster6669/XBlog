import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Създаваме таймер, който ще се стартира, когато стойността се промени
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Почистваме таймера при всяка промяна на стойността или delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

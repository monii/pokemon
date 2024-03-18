import { useEffect, useState } from 'react';

// onChage 성능 개선 및 query string 동기화
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    }; 
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
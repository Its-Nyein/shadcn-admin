import { useEffect, useRef, useState } from "react";

export function useDebouncedCallback(
  externalValue: string,
  onDebouncedChange: (value: string) => void,
  delay = 300,
) {
  const [value, setValue] = useState(externalValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onDebouncedChange(newValue);
    }, delay);
  };

  return [value, handleChange] as const;
}

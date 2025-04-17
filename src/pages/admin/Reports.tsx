
type ValueType = number | string;

// Modify any toFixed calls to ensure type safety
const formatValue = (value: ValueType): string => {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  return String(value);
};

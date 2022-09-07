

export const getMedian = (numbers:number[]) => {
  if (numbers.length === 0) {
    throw new Error('\'getMedian\' - cannot calculate median of empty array!');
  }
  if (numbers.length === 1) {
    return numbers[0];
  }
  const copy = [...numbers];
  copy.sort((a, b) => a - b);
  const middleIndex = Math.floor(copy.length / 2);
  if (copy.length % 2 === 1) {
    return copy[middleIndex];
  }
  return (copy[middleIndex] + copy[middleIndex - 1]) / 2;
};

export const getArithmeticAverage = (values:number[]) => {
  if (values.length === 0) {
    throw new Error('\'getArithmeticAverage\' - cannot calculate average of empty array!');
  }
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return sum / values.length;
};
// for equally probable values
export const getVariance = (values:number[]) => {
  if (values.length === 0) {
    throw new Error('\'getVariance\' - cannot calculate variance of empty array!');
  }
  const mean = getArithmeticAverage(values);
  return (values.reduce((sum, current) => sum + (current - mean) ** 2, 0) / values.length);
};

export const getStandardDeviation = (values:number[]) => {
  if (values.length === 0) {
    throw new Error('\'getStandardDeviation\' - cannot calculate standard deviation of empty array!');
  }
  return Math.sqrt(getVariance(values));
};

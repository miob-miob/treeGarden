

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

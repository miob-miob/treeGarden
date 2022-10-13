/**
 * returns most common values of input array (if counts are equal return all values with this count)
 * @param {Array<string>} values
 * @return {string[]}
 */
export const getMostCommonValues = (values:string[]) => {
  const calculatedCounts = values.reduce((counts:{ [key:string]:number }, currentValue) => {
    if (currentValue.trim().length === 0) {
      throw new Error('During call of \'getMostCommonValues\' one of value has other type then string!');
    }
    const trimmedValue = currentValue.trim();
    if (!counts[trimmedValue]) {
      // eslint-disable-next-line no-param-reassign
      counts[trimmedValue] = 0;
    }
    // eslint-disable-next-line no-param-reassign
    counts[trimmedValue] += 1;
    return counts;
  }, {});

  const largestCount = Math.max(...Object.values(calculatedCounts));
  return Object.entries(calculatedCounts)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([, count]) => count === largestCount)
    .map(([value]) => value);
};

export const getMostCommonValue = (values:string[]) => getMostCommonValues(values)[0];


/**
 * calculates gini index
 * @param {Array<number>} frequenciesOfClasses number[]
 * @returns {number}
 */


// todo write tests
export const getGiniIndex = (frequenciesOfClasses) => {
  const numberOfAllSamples = frequenciesOfClasses.reduce((sum, currentClassCount) => sum + currentClassCount, 0);
  const squaredProbabilities = frequenciesOfClasses.reduce(
    (sumOfProbabilities, currentFrequency) => sumOfProbabilities + (currentFrequency / numberOfAllSamples) ** 2,
    0
  );
  return 1 - squaredProbabilities;
};

/* eslint-disable no-underscore-dangle,no-param-reassign */

/**
 * calculates entropy
 * @param frequenciesOfClasses number[]
 * @returns {number}
 */
export const getEntropy = (frequenciesOfClasses) => {
  const numberOfAllSamples = frequenciesOfClasses.reduce((sum, currentClassCount) => sum + currentClassCount, 0);
  return frequenciesOfClasses.reduce(
    (entropy, currentClassCount) => {
      const probability = currentClassCount / numberOfAllSamples;
      if (probability > 0) {
        return entropy - (probability) * Math.log2(probability);
      }
      return entropy;
    },
    0
  );
};


export const getEntropyOfDataSet = (dataSet, knownClasses) => {
  // zero counts as initial state
  let counts = Object.fromEntries(knownClasses.map((classId) => ([classId, 0])));
  counts = dataSet.reduce((overallCounts, currentSample) => {
    overallCounts[currentSample._class] += 1;
    return overallCounts;
  }, counts);
  return getEntropy(Object.values(counts));
};

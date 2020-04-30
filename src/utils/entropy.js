/* eslint-disable no-underscore-dangle,no-param-reassign */

/**
 * calculates entropy
 * @param {Array<number>} frequenciesOfClasses number[]
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


// todo write tests
/**
 *
 * @param {Array<number>} frequenciesOfClasses frequency of occurrence in given classes
 * @param {Array<Array<number>>} frequenciesOfClassesChildren same as frequenciesOfClasses but after split
 * that means array of arrays of frequencies for binary split you will have two arrays one for left node second for right node
 * @returns {number}
 */
export const getInformationGain = (frequenciesOfClasses, frequenciesOfClassesChildren) => {
  const nItems = frequenciesOfClasses.reduce((sum, current) => sum + current, 0);
  const parentEntropy = getEntropy(frequenciesOfClasses);
  const childEntropy = frequenciesOfClassesChildren.reduce((entropy, currentFrequencies) => {
    // weighted average of child entropy
    const childNItems = currentFrequencies.reduce((sum, current) => sum + current, 0);
    return entropy + (childNItems / nItems) * getEntropy(currentFrequencies);
  }, 0);
  return parentEntropy - childEntropy;
};

// todo jsdoc
export const getEntropyOfDataSet = (dataSet, knownClasses) => {
  // zero counts as initial state
  let counts = Object.fromEntries(knownClasses.map((classId) => ([classId, 0])));
  counts = dataSet.reduce((overallCounts, currentSample) => {
    overallCounts[currentSample._class] += 1;
    return overallCounts;
  }, counts);
  return getEntropy(Object.values(counts));
};

/* eslint-disable no-underscore-dangle,no-param-reassign */
import { getScoreForGivenSplitCriteria } from '../dataSet/split';
import { getFrequenciesOfClasses } from '../dataSet/set';


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

/**
 *
 * @param {Array<Object>} dataSet whole data set
 * @param {Array<string>} knownClasses
 * @return {number}
 */
export const getEntropyForDataSet = (dataSet, knownClasses) => {
  const frequencies = getFrequenciesOfClasses(dataSet, knownClasses);
  return getEntropy(Object.values(frequencies));
};

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

/**
 *
 * @param {Array<Object>} dataSet
 * @param {function(object):string|boolean} splitCriteriaFn function that produces tag of given sample
 * @param {Array<string>} knownClasses
 * @return {number}
 */
export const getInformationGainForSplitCriteria = (
  dataSet,
  splitCriteriaFn,
  knownClasses
) => getScoreForGivenSplitCriteria(dataSet, splitCriteriaFn, knownClasses, getInformationGain);

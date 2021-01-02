import { getFrequenciesOfClasses } from '../statistic/frequencies';
import { getScoreForGivenSplitCriteria } from '../dataSet/split';


/**
 * calculates gini index
 * @param {Array<number>} frequenciesOfClasses number[]
 * @returns {number}
 */
export const getGiniIndex = (frequenciesOfClasses) => {
  const numberOfAllSamples = frequenciesOfClasses.reduce((sum, currentClassCount) => sum + currentClassCount, 0);
  const squaredProbabilities = frequenciesOfClasses.reduce(
    (sumOfProbabilities, currentFrequency) => sumOfProbabilities + (currentFrequency / numberOfAllSamples) ** 2,
    0
  );
  return 1 - squaredProbabilities;
};

/**
 *
 * @param {Array<Object>} dataSet desired dataset
 * @param {Array<string>} knownClasses array of all known classes
 * @return {number}
 */

export const getGiniIndexForDataSet = (dataSet, knownClasses) => {
  const frequencies = getFrequenciesOfClasses(dataSet, knownClasses);
  return getGiniIndex(Object.values(frequencies));
};

/**
 *
 * @param {Array<number>} frequenciesOfClasses frequency of occurrence in given classes
 * @param {Array<Array<number>>} frequenciesOfClassesChildren same as frequenciesOfClasses but after split
 * that means array of arrays of frequencies for binary split you will have two arrays one for left node second for right node
 * @returns {number}
 */
export const getGiniIndexForSplit = (frequenciesOfClasses, frequenciesOfClassesChildren) => {
  const totalSamples = frequenciesOfClasses.reduce((sum, current) => current + sum, 0);
  return frequenciesOfClassesChildren.reduce((weightedSum, currentFrequencies) => {
    const totalSamplesInPartition = currentFrequencies.reduce((sum, current) => current + sum, 0);
    const giniForPartition = getGiniIndex(currentFrequencies);
    return weightedSum + (totalSamplesInPartition / totalSamples) * giniForPartition;
  }, 0);
};

/**
 *
 * @param {Array<Object>} dataSet
 * @param {function(object):string|boolean} splitCriteriaFn function that produces tag of given sample
 * @param {Array<string>} knownClasses
 * @return {number}
 */
export const getGiniIndexForSplitCriteria = (
  dataSet,
  splitCriteriaFn,
  knownClasses
) => getScoreForGivenSplitCriteria(dataSet, splitCriteriaFn, knownClasses, getGiniIndexForSplit);

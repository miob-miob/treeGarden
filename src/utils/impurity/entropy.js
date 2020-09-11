/* eslint-disable no-underscore-dangle,no-param-reassign */

import { getFrequenciesOfClasses } from '../dataSet/set';
import { splitDataSet } from '../dataSet/split';

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

// todo jsdoc
export const getEntropyOfDataSet = (dataSet, knownClasses) => {
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

export const getInformationGainForSplitCriteria = (dataSet, splitCriteriaFn, knownClasses) => {
  const parentFrequencies = Object.values(getFrequenciesOfClasses(dataSet, knownClasses));
  const childDataSets = splitDataSet(dataSet, splitCriteriaFn);
  const childFrequencies = Object.values(childDataSets)
    .map((childSet) => Object.values(getFrequenciesOfClasses(childSet, knownClasses)));
  return getInformationGain(parentFrequencies, childFrequencies);
};

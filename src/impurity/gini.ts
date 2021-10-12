import { getFrequenciesOfClasses } from '../statistic/frequencies';
import { TreeGardenDataSample } from '../dataSet/set';
import { AlgorithmConfiguration } from '../algorithmConfiguration';
import { SplitCriteriaFn } from '../dataSet/split';


/**
 * calculates gini index
 * @param {Array<number>} frequenciesOfClasses number[]
 * @returns {number}
 */
export const getGiniIndex = (frequenciesOfClasses:number[]) => {
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

export const getGiniIndexForDataSet = (dataSet:TreeGardenDataSample[], knownClasses:string[]) => {
  const frequencies = getFrequenciesOfClasses(dataSet, knownClasses);
  return getGiniIndex(Object.values(frequencies));
};

export const getGiniIndexForSplit = (
  parentSet:TreeGardenDataSample[],
  childrenSets:{ [key:string]:TreeGardenDataSample[] },
  config:AlgorithmConfiguration,
  _splitter:SplitCriteriaFn
) => {
  const frequenciesOfClassesChildren = Object.values(childrenSets).map((set) => Object.values(getFrequenciesOfClasses(set, config.allClasses!)));
  const totalSamples = parentSet.length;
  return frequenciesOfClassesChildren.reduce((weightedSum, currentFrequencies) => {
    const totalSamplesInPartition = currentFrequencies.reduce((sum, current) => current + sum, 0);
    const giniForPartition = getGiniIndex(currentFrequencies);
    return weightedSum + (totalSamplesInPartition / totalSamples) * giniForPartition;
  }, 0);
};

import { getFrequenciesOfClasses } from '../statistic/frequencies';
import { TreeGardenDataSample } from '../dataSet/set';


export const getEntropy = (frequenciesOfClasses:number[]) => {
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


export const getEntropyForDataSet = (dataSet:TreeGardenDataSample[], knownClasses:string[]) => {
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
export const getInformationGainForSplit = (frequenciesOfClasses:number[], frequenciesOfClassesChildren:number[][]) => {
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
 * gain ratio is similar like information gain, but  penalizes  splits that have many distinct values (like dates, IDs or names)
 *
 * @param {Array<number>} frequenciesOfClasses frequency of occurrence in given classes
 * @param {Array<Array<number>>} frequenciesOfClassesChildren same as frequenciesOfClasses but after split
 * that means array of arrays of frequencies for binary split you will have two arrays one for left node second for right node
 * @returns {number}
 */
export const getInformationGainRatioForSplit = (frequenciesOfClasses:number[], frequenciesOfClassesChildren:number[][]) => {
  const splitSizes = frequenciesOfClassesChildren.reduce((result, currentSplit) => {
    result.push(currentSplit.reduce((all, item) => all + item, 0));
    return result;
  }, []);
  // split information is calculates like entropy of split sizes and is used for normalization of informationGain
  // split information is large when there is big number of small subsets
  const splitInformation = getEntropy(splitSizes);

  return getInformationGainForSplit(frequenciesOfClasses, frequenciesOfClassesChildren) / splitInformation;
};

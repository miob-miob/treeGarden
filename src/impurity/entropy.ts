import { getFrequenciesOfClasses } from '../statistic/frequencies';
import { TreeGardenDataSample } from '../dataSet/set';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { SplitCriteriaFn } from '../dataSet/split';


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

export const getInformationGainForSplit = (
  parentSet:TreeGardenDataSample[],
  childrenSets:{ [key:string]:TreeGardenDataSample[] },
  config:TreeGardenConfiguration,
  _splitFn: SplitCriteriaFn
) => {
  const frequenciesOfClasses = Object.values(getFrequenciesOfClasses(parentSet, config.allClasses!));
  const frequenciesOfClassesChildren = Object.values(childrenSets).map((set) => Object.values(getFrequenciesOfClasses(set, config.allClasses!)));
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
 */
export const getInformationGainRatioForSplit = (
  parentSet:TreeGardenDataSample[],
  childrenSets:{ [key:string]:TreeGardenDataSample[] },
  config:TreeGardenConfiguration,
  splitFn:SplitCriteriaFn
) => {
  const frequenciesOfClassesChildren = Object.values(childrenSets).map((set) => Object.values(getFrequenciesOfClasses(set, config.allClasses!)));
  const splitSizes = frequenciesOfClassesChildren.reduce((result, currentSplit) => {
    result.push(currentSplit.reduce((all, item) => all + item, 0));
    return result;
  }, []);
  // split information is calculates like entropy of split sizes and is used for normalization of informationGain
  // split information is large when there is big number of small subsets
  const splitInformation = getEntropy(splitSizes);
  if (splitInformation === 0) {
    return 0;
  }
  return getInformationGainForSplit(parentSet, childrenSets, config, splitFn) / splitInformation;
};

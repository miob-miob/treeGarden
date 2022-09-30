import { AlgorithmConfiguration } from './index';
import { chooseManyWithoutRepeats } from '../randomization';
import { TreeGardenDataSample } from '../dataSet/set';
import { getResultFromMultipleTrees } from '../predict';


// todo  master growForest  - replace dataset, subsets + sample hash for oobe
export const defaultRandomForestConfiguration = {
  numberOfTrees: 27, // number of trees in random forest

  // how to choose subset of attributes for each tree
  getAttributes: (algorithmConfiguration:AlgorithmConfiguration, _dataSet:TreeGardenDataSample[]) => {
    const attributeKeys = Object.keys(algorithmConfiguration.attributes);
    const nAttributes = algorithmConfiguration.treeType === 'regression'
      ? Math.ceil(Math.sqrt(attributeKeys.length))
      : Math.ceil(attributeKeys.length / 3);
    return chooseManyWithoutRepeats(attributeKeys, nAttributes);
  },
  calculateOutOfTheBagError: true, // https://en.wikipedia.org/wiki/Out-of-bag_error
  numberOfBootstrappedSamples: 0, // number of samples bootstrapped from original dataset - 0 = all,
  majorityVotingFn: getResultFromMultipleTrees
};

export type RandomForestConfiguration = typeof defaultRandomForestConfiguration;

export const getAlgorithmConfigForEachTree = (
  dataSet:TreeGardenDataSample[],
  fullConfiguration:AlgorithmConfiguration,
  options: RandomForestConfiguration
) => {
  const mergedOptions = { ...defaultRandomForestConfiguration, ...options };
  return Array.from(Array(mergedOptions.numberOfTrees)).map((_x) => {
    const attributesForThisConfig = mergedOptions.getAttributes(fullConfiguration, dataSet);
    const newConfig = { ...fullConfiguration };
    newConfig.includedAttributes = attributesForThisConfig;
    newConfig.excludedAttributes = [];

    const chosenAttributes = newConfig.includedAttributes.reduce((result, current) => {
      // eslint-disable-next-line no-param-reassign
      result[current] = fullConfiguration.attributes[current];
      return result;
    }, {} as AlgorithmConfiguration['attributes']);

    newConfig.attributes = chosenAttributes;
    return newConfig;
  });
};

import {
  AlgorithmConfiguration
} from './algorithmConfiguration';
import { chooseManyWithoutRepeats } from './randomization';
import { TreeGardenDataSample } from './dataSet/set';


// todo  master growForest  - replace dataset, subsets + sample hash for oobe
const defaultOptions = {
  nTrees: 27,
  getAttributes: (algorithmConfiguration:AlgorithmConfiguration, _dataSet:TreeGardenDataSample[]) => {
    const attributeKeys = Object.keys(algorithmConfiguration.attributes);
    const nAttributes = algorithmConfiguration.treeType === 'regression'
      ? Math.ceil(Math.sqrt(attributeKeys.length))
      : Math.ceil(attributeKeys.length / 3);
    return chooseManyWithoutRepeats(attributeKeys, nAttributes);
  },
  calculateOutOfTheBagError: true
};

export const getAlgorithmConfigurationsForRandomForest = (
  dataSet:TreeGardenDataSample[],
  fullConfiguration:AlgorithmConfiguration,
  options:Partial<typeof defaultOptions> = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };
  return Array.from(Array(mergedOptions.nTrees)).map((_x) => {
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

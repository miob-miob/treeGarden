import { TreeGardenConfiguration } from './index';
import { TreeGardenDataSample } from '../dataSet/set';
import { chooseManyWithoutRepeats } from '../randomization';

// return value is for typedoc - it was confused

/**
 * Function that returns configuration for each tree of random forest - it uses [bagging](https://en.wikipedia.org/wiki/Random_forest#From_bagging_to_random_forests)
 * to select set of attributes different for each tree.
 */
export const getAlgorithmConfigForEachTree = (
  dataSet:TreeGardenDataSample[],
  fullConfiguration:TreeGardenConfiguration
):TreeGardenConfiguration[] => Array.from(Array(fullConfiguration.numberOfTrees)).map((_x) => {
  const attributesForThisConfig = fullConfiguration.getAttributesForTree(fullConfiguration, dataSet);
  const newConfig = { ...fullConfiguration };
  newConfig.includedAttributes = attributesForThisConfig;
  newConfig.excludedAttributes = [];

  const chosenAttributes = newConfig.includedAttributes.reduce((result, current) => {
    // eslint-disable-next-line no-param-reassign
    result[current] = fullConfiguration.attributes[current];
    return result;
  }, {} as TreeGardenConfiguration['attributes']);

  newConfig.attributes = chosenAttributes;
  return newConfig;
});

/**
 * Implementation of [feature bagging](https://en.wikipedia.org/wiki/Random_forest#From_bagging_to_random_forests) for random forests.
 */
export const getSubsetOfAttributesForTreeOfRandomForest = (algorithmConfiguration:TreeGardenConfiguration, _dataSet:TreeGardenDataSample[]) => {
  const attributeKeys = Object.keys(algorithmConfiguration.attributes);
  const nAttributes = algorithmConfiguration.treeType === 'regression'
    ? Math.ceil(Math.sqrt(attributeKeys.length))
    : Math.ceil(attributeKeys.length / 3);
  return chooseManyWithoutRepeats(attributeKeys, nAttributes);
};

import { TreeGardenConfiguration } from './index';
import { TreeGardenDataSample } from '../dataSet/set';


export const getAlgorithmConfigForEachTree = (
  dataSet:TreeGardenDataSample[],
  fullConfiguration:TreeGardenConfiguration
) => Array.from(Array(fullConfiguration.numberOfTrees)).map((_x) => {
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

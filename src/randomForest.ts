import {
  AlgorithmConfiguration,
  buildAlgorithmConfiguration,
  PartialAlgorithmConfiguration
} from './algorithmConfiguration/buildAlgorithmConfiguration';
import { chooseManyWithoutRepeats } from './randomization';
import { TreeGardenDataSample } from './dataSet/set';


const defaultOptions = {
  nTrees: 27,
  getAttributes: (algorithmConfiguration:AlgorithmConfiguration, _dataSet:TreeGardenDataSample[]) => {
    const attributeKeys = Object.keys(algorithmConfiguration.attributes);
    const nAttributes = algorithmConfiguration.treeType === 'regression'
      ? Math.ceil(Math.sqrt(attributeKeys.length))
      : Math.ceil(attributeKeys.length / 3);
    return chooseManyWithoutRepeats(attributeKeys, nAttributes);
  }
};

export const getAlgorithmConfigurationsForRandomForest = (
  dataSet:TreeGardenDataSample[],
  algorithmConfig:PartialAlgorithmConfiguration = {},
  options:Partial<typeof defaultOptions> = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const masterConfig = buildAlgorithmConfiguration(dataSet, algorithmConfig);
  return Array.from(Array(mergedOptions.nTrees)).map((_x) => {
    const attributesForThisConfig = mergedOptions.getAttributes(masterConfig, dataSet);
    const partialConfig = { ...algorithmConfig };
    partialConfig.includedAttributes = attributesForThisConfig;
    partialConfig.excludedAttributes = [];
    return buildAlgorithmConfiguration(dataSet, partialConfig);
  });
};

import { getAllAttributeIds, getTypeOfAttribute } from '../utils/dataSet/set';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';

export const keysInheritedFromAlgorithmConfigurationIfNotDefined = [
  'induceMissingValueReplacement',
  'evaluateMissingValueReplacement',
  'missingValue',
  'mapper',
  'getAllPossibleSplitCriteriaForDiscreteAttribute',
  'getAllPossibleSplitCriteriaForContinuousAttribute'
];

export const buildAttributesConfiguration = (configuration, dataSet) => {
  const consideredAttributes = configuration.includedAttributes.length > 0 ? configuration.includedAttributes : getAllAttributeIds(dataSet)
    .filter((attributeId) => !configuration.excludedAttributes.includes(attributeId));
  return consideredAttributes.reduce((result, currentAttributeId) => {
    const attributeFromConfig = configuration.attributes[currentAttributeId];

    const resultAttrConfig = attributeFromConfig ? { ...defaultAttributeConfiguration, ...attributeFromConfig }
      : { ...defaultAttributeConfiguration };
    if (resultAttrConfig.dataType === 'automatic') {
      resultAttrConfig.dataType = getTypeOfAttribute(dataSet, currentAttributeId, resultAttrConfig.missingValue);
    }
    keysInheritedFromAlgorithmConfigurationIfNotDefined.forEach((configKey) => {
      if (resultAttrConfig[configKey] === undefined) {
        resultAttrConfig[configKey] = configuration[configKey];
      }
    });
    // eslint-disable-next-line no-param-reassign
    result[currentAttributeId] = resultAttrConfig;
    return result;
  }, {});
};


import { DataSetSample, getAllAttributeIds, getTypeOfAttribute } from '../utils/dataSet/set';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
import { AlgorithmConfig } from './algorithmDefaultConfiguration';

export const keysInheritedFromAlgorithmConfigurationIfNotDefined = [
  'induceMissingValueReplacement',
  'evaluateMissingValueReplacement',
  'missingValue',
  'getAllPossibleSplitCriteriaForDiscreteAttribute',
  'getAllPossibleSplitCriteriaForContinuousAttribute'
] as const;

type ConfigWithPartialAttributes = Omit<AlgorithmConfig, 'attributes'> & { attributes: { [key:string]:Partial<typeof defaultAttributeConfiguration> } };
export const buildAttributesConfiguration = (configuration:ConfigWithPartialAttributes, dataSet:DataSetSample[]) => {
  const consideredAttributes = configuration.includedAttributes.length > 0 ? configuration.includedAttributes : getAllAttributeIds(dataSet)
    .filter((attributeId:string) => !configuration.excludedAttributes.includes(attributeId));
  return consideredAttributes.reduce((result:{ [key:string]:typeof defaultAttributeConfiguration }, currentAttributeId) => {
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


import { TreeGardenDataSample, getAllAttributeIds, getTypeOfAttribute } from '../dataSet/set';
// eslint-disable-next-line import/no-cycle
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
// eslint-disable-next-line import/no-cycle
import { TreeGardenConfiguration } from './buildAlgorithmConfiguration';

export const keysInheritedFromAlgorithmConfigurationIfNotDefined = [
  'growMissingValueReplacement',
  'evaluateMissingValueReplacement',
  'missingValue',
  'getAllPossibleSplitCriteriaForDiscreteAttribute',
  'getAllPossibleSplitCriteriaForContinuousAttribute'
] as const;

type ConfigWithPartialAttributes = Omit<TreeGardenConfiguration, 'attributes'> & { attributes: { [key:string]:Partial<typeof defaultAttributeConfiguration> } };
export const buildAttributesConfiguration = (configuration:ConfigWithPartialAttributes, dataSet:TreeGardenDataSample[]) => {
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


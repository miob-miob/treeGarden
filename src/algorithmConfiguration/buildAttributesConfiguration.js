import { getAllAttributeIds } from '../utils/dataSet/set';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';

export const buildAttributesConfiguration = (fullConfiguration, dataSet) => {
  const consideredAttributes = fullConfiguration.includedAttributes.length > 0 ? fullConfiguration.includedAttributes : getAllAttributeIds(dataSet)
    .filter((attributeId) => !fullConfiguration.excludedAttributes.includes(attributeId));

  return consideredAttributes.reduce((result, currentAttributeId) => {
    const attributeFromConfig = fullConfiguration.attributes[currentAttributeId];

    // eslint-disable-next-line no-param-reassign
    result[currentAttributeId] = attributeFromConfig ? { ...defaultAttributeConfiguration, ...attributeFromConfig }
      : { ...defaultAttributeConfiguration };
    return result;
  }, {});
};


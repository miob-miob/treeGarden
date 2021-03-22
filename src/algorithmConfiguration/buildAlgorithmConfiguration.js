import { defaultConfiguration } from './algorithmDefaultConfiguration';
import { buildAttributesConfiguration } from './buildAttributesConfiguration';

export const buildAlgorithmConfiguration = (configuration, dataSet) => {
  const mergedConfiguration = { ...defaultConfiguration, ...(configuration || {}) };
  mergedConfiguration.attributes = buildAttributesConfiguration(mergedConfiguration, dataSet);
  return mergedConfiguration;
};

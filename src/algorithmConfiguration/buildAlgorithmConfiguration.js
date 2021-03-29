import { defaultConfiguration } from './algorithmDefaultConfiguration';
import { buildAttributesConfiguration } from './buildAttributesConfiguration';
import { getClassesOfDataSet } from '../utils/dataSet/set';

export const buildAlgorithmConfiguration = (configuration, dataSet) => {
  const mergedConfiguration = { ...defaultConfiguration, ...(configuration || {}) };
  if (!mergedConfiguration.allClasses) {
    mergedConfiguration.allClasses = getClassesOfDataSet(dataSet);
  }
  mergedConfiguration.attributes = buildAttributesConfiguration(mergedConfiguration, dataSet);
  return mergedConfiguration;
};

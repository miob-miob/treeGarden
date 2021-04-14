import { AlgorithmConfig, defaultConfiguration, PartialConfig } from './algorithmDefaultConfiguration';
import { buildAttributesConfiguration } from './buildAttributesConfiguration';
import { DataSetSample, getClassesOfDataSet } from '../utils/dataSet/set';


export const buildAlgorithmConfiguration = (dataSet:DataSetSample[], configuration: PartialConfig = {}) => {
  if (configuration.buildTime) {
    throw new Error(`This configuration was already build! ${JSON.stringify(configuration)}`);
  }

  if (!dataSet) {
    throw new Error('Data set that will be used for learning is required in "buildAlgorithmConfiguration" function call.');
  }
  const mergedConfiguration = { ...defaultConfiguration, ...(configuration || {}) };
  if (!mergedConfiguration.allClasses) {
    mergedConfiguration.allClasses = getClassesOfDataSet(dataSet);
  }
  mergedConfiguration.attributes = buildAttributesConfiguration(mergedConfiguration, dataSet);
  mergedConfiguration.buildTime = Date.now();
  return mergedConfiguration as AlgorithmConfig;
};

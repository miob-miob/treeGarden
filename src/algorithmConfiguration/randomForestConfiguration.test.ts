import { getAlgorithmConfigurationsForRandomForest, defaultRandomForestConfiguration } from './randomForestConfiguration';

import { irisSet } from '../sampleDataSets';
import { buildAlgorithmConfiguration } from './index';

test('getAlgorithmConfigurationsForRandomForest', () => {
  const fullConfig = buildAlgorithmConfiguration(irisSet, {});
  const configs = getAlgorithmConfigurationsForRandomForest(irisSet, fullConfig, { ...defaultRandomForestConfiguration, nTrees: 4 });
  expect(configs.length).toBe(4);
  expect(Object.keys(configs[0].attributes).length).toBe(2);
});

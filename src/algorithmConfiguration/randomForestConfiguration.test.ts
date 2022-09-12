import { getAlgorithmConfigForEachTree, defaultRandomForestConfiguration } from './randomForestConfiguration';

import { irisSet } from '../sampleDataSets';
import { buildAlgorithmConfiguration } from './index';

test('getAlgorithmConfigForEachTree', () => {
  const fullConfig = buildAlgorithmConfiguration(irisSet, {});
  const configs = getAlgorithmConfigForEachTree(irisSet, fullConfig, { ...defaultRandomForestConfiguration, numberOfTrees: 4 });
  expect(configs.length).toBe(4);
  expect(Object.keys(configs[0].attributes).length).toBe(2);
});

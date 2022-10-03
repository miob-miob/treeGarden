import { getAlgorithmConfigForEachTree } from './randomForestConfiguration';

import { irisSet } from '../sampleDataSets';
import { buildAlgorithmConfiguration } from './index';

test('getAlgorithmConfigForEachTree', () => {
  const fullConfig = buildAlgorithmConfiguration(irisSet, {
    numberOfTrees: 4
  });
  const configs = getAlgorithmConfigForEachTree(irisSet, fullConfig);
  expect(configs.length).toBe(4);
  expect(Object.keys(configs[0].attributes).length).toBe(2);
});

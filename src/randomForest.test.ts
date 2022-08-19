import { getAlgorithmConfigurationsForRandomForest } from './randomForest';

import { irisSet } from './sampleDataSets';

test('getAlgorithmConfigurationsForRandomForest', () => {
  const configs = getAlgorithmConfigurationsForRandomForest(irisSet, undefined, { nTrees: 4 });
  expect(configs.length).toBe(4);
  expect(Object.keys(configs[0].attributes).length).toBe(2);
});

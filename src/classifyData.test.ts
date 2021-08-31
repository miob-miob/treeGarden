

import { getPredictedClassesOfSamples, getLeafNodesForSamples, getLeafNodeOfSample } from './classifyData';
import { buildAlgorithmConfiguration } from './algorithmConfiguration';
import { tennisSet } from './sampleDataSets';
import { tennisTree } from './sampleTrainedTrees/tennisTree';
import { getTreeNodeById } from './treeNode';


const samples = [
  { outlook: 'Sunny', humidity: 'High' },
  { outlook: 'Rain', wind: 'Weak' }
];
const leafNodes = [
  tennisTree.childNodes.Sunny.childNodes.High,
  tennisTree.childNodes.Rain.childNodes.Weak
];
const config = buildAlgorithmConfiguration(tennisSet);

test('getLeafNodeOfSample', () => {
  const sample = samples[0];
  expect(getLeafNodeOfSample(sample, tennisTree, config)).toEqual(
    getTreeNodeById(tennisTree, '9f156fc0-3f82-4a31-863e-108bfb37fc60')
  );
  expect(getLeafNodeOfSample(sample, tennisTree, config, true)).toEqual([
    'f2f856dc-c656-4689-b32a-a4b3a4c3aaab',
    'c4402f7c-f227-48ab-8040-a703dd34e7ab',
    '9f156fc0-3f82-4a31-863e-108bfb37fc60'
  ]);
});

// todo test also replacing of missing values when implemented
test('getLeafNodesForSamples', () => {
  const result = getLeafNodesForSamples(samples, tennisTree, config);
  expect(result[0][0]).toEqual(samples[0]);
  expect(result[0][1]).toEqual(leafNodes[0]);

  expect(result[1][0]).toEqual(samples[1]);
  expect(result[1][1]).toEqual(leafNodes[1]);
});

test('getPredictedClassesOfSamples', () => {
  const result = getPredictedClassesOfSamples(samples, tennisTree, config);
  expect(result[0][0]).toEqual(samples[0]);
  expect(result[0][1]).toEqual('No');

  expect(result[1][0]).toEqual(samples[1]);
  expect(result[1][1]).toEqual('Yes');
});

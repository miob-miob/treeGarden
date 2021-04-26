

import { getPredictedClassesOfSamples, getLeafNodesForSamples } from './classifyData';
import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { tennisSet } from './sampleDataSets';
import { tennisTree } from './sampleTrainedTrees/tennisTree';


const samples = [
  { outlook: 'Sunny', humidity: 'High' },
  { outlook: 'Rain', wind: 'Weak' }
];
const leafNodes = [
  tennisTree.childNodes.Sunny.childNodes.High,
  tennisTree.childNodes.Rain.childNodes.Weak
];
const config = buildAlgorithmConfiguration(tennisSet);

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

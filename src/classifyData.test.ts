/* eslint-disable max-len */

import { getPredictedClassesOfSamples, getLeafNodesForSamples } from './classifyData';
import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { tennisSet } from './sampleDataSets';

// learned with: {
//   impurityScoringForSplit: getGiniIndexForSplit,
//   biggerImpurityScoreBetterSplit: false
// }

const tennisTree = {
  isLeaf: false,
  chosenSplitCriteria: ['outlook', '=='],
  impurityScore: 0.34285714285714286,
  bestSplits: [{ split: ['outlook', '=='], score: 0.34285714285714286 }, { split: ['humidity', '=='], score: 0.3673469387755103 }, { split: ['wind', '=='], score: 0.42857142857142855 }],
  dataPartitionsCounts: { Sunny: { No: 3, Yes: 2 }, Overcast: { Yes: 4 }, Rain: { Yes: 3, No: 2 } },
  classCounts: { No: 5, Yes: 9 },
  depth: 0,
  alreadyUsedSplits: [['outlook', '==']],
  childNodes: {
    Sunny: {
      isLeaf: false,
      chosenSplitCriteria: ['humidity', '=='],
      impurityScore: 0,
      bestSplits: [{ split: ['humidity', '=='], score: 0 }, { split: ['temp', '=='], score: 0.2 }, { split: ['wind', '=='], score: 0.4666666666666667 }],
      dataPartitionsCounts: { High: { No: 3 }, Normal: { Yes: 2 } },
      classCounts: { No: 3, Yes: 2 },
      depth: 1,
      alreadyUsedSplits: [['outlook', '=='], ['humidity', '==']],
      childNodes: {
        High: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Hot: { No: 2 }, Mild: { No: 1 } }, classCounts: { No: 3 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['humidity', '=='], ['temp', '==']]
        },
        Normal: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Cool: { Yes: 1 }, Mild: { Yes: 1 } }, classCounts: { Yes: 2 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['humidity', '=='], ['temp', '==']]
        }
      }
    },
    Overcast: {
      isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Hot: { Yes: 2 }, Cool: { Yes: 1 }, Mild: { Yes: 1 } }, classCounts: { Yes: 4 }, depth: 1, alreadyUsedSplits: [['outlook', '=='], ['temp', '==']]
    },
    Rain: {
      isLeaf: false,
      chosenSplitCriteria: ['wind', '=='],
      impurityScore: 0,
      bestSplits: [{ split: ['wind', '=='], score: 0 }, { split: ['temp', '=='], score: 0.4666666666666667 }, { split: ['humidity', '=='], score: 0.4666666666666667 }],
      dataPartitionsCounts: { Weak: { Yes: 3 }, Strong: { No: 2 } },
      classCounts: { Yes: 3, No: 2 },
      depth: 1,
      alreadyUsedSplits: [['outlook', '=='], ['wind', '==']],
      childNodes: {
        Weak: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }], dataPartitionsCounts: { Mild: { Yes: 2 }, Cool: { Yes: 1 } }, classCounts: { Yes: 3 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['wind', '=='], ['temp', '==']]
        },
        Strong: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }], dataPartitionsCounts: { Cool: { No: 1 }, Mild: { No: 1 } }, classCounts: { No: 2 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['wind', '=='], ['temp', '==']]
        }
      }
    }
  }
};

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

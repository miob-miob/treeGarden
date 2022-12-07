/* eslint-disable no-underscore-dangle */
import { simpleTree } from '../sampleTrainedTrees/simpleTree';
import { simpleSet } from '../sampleDataSets';
import { getOutOfTheBagError } from './randomForestStats';
import { TreeGardenNode } from '../treeNode';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';
import { getResultFromMultipleTrees } from '../predict';
import { getRightOnBlackSimpleTree } from '../testUtils';

test('getOutOfTheBagError', () => {
  const algorithmConfig = buildAlgorithmConfiguration(simpleSet, {});

  const simpleDataSetWithIds = simpleSet.map((item) => ({ ...item, _id: item._label }));

  const badOnBlackTree = getRightOnBlackSimpleTree();

  // as sample 1 and 2 has color black - two bad on black trees should upvote over correct tree
  // sample 3 will be considered just by one tree => only correct result
  // samples 4 and 5 will be ignored s there are no threes that was not learnt on them
  // miss classification rate should be then 0.3333

  const treesAndOobSets = [
    [simpleTree as TreeGardenNode, new Set(['1', '2', '3'])],
    [badOnBlackTree, new Set(['1', '2'])],
    [badOnBlackTree, new Set(['1', '2'])]
  ];
  const oobError = getOutOfTheBagError(
    treesAndOobSets as Parameters<typeof getOutOfTheBagError>[0],
    simpleDataSetWithIds,
    algorithmConfig,
    getResultFromMultipleTrees
  );

  expect(oobError).toBeCloseTo(1 / 3);
});

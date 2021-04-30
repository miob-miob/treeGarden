import { getMissClassificationRateOfTree } from './costComplexityPruning';
import { getTreeCopy, mutateNonLeafNodeIntoLeafOne } from '../treeNode';
import { tennisTree } from '../sampleTrainedTrees/tennisTree';

test('getMissClassificationRateOfTree', () => {
  const tennisTreeCopy = getTreeCopy(tennisTree);
  expect(getMissClassificationRateOfTree(tennisTreeCopy)).toBeCloseTo(0);

  mutateNonLeafNodeIntoLeafOne(tennisTreeCopy.childNodes.Rain);
  const treeMissProbability = (1 - 3 / 5) * (5 / 14);
  expect(getMissClassificationRateOfTree(tennisTreeCopy)).toBeCloseTo(treeMissProbability);
});

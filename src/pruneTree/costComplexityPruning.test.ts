import {
  getAlphaForNode, getAlphasAndSubTreesForFullTree,
  getMissClassificationRateOfNode,
  getMissClassificationRateOfTree
} from './costComplexityPruning';
import {
  getNumberOfTreeNodes, getTreeCopy, mutateNonLeafNodeIntoLeafOne
} from '../treeNode';
import { tennisTree } from '../sampleTrainedTrees/tennisTree';
import { titanicTree } from '../sampleTrainedTrees/titanicTree';
import { tennisSet } from '../sampleDataSets';

const tennisSetLength = tennisSet.length;
test('getMissClassificationRateOfTree', () => {
  const tennisTreeCopy = getTreeCopy(tennisTree);
  expect(getMissClassificationRateOfTree(tennisTreeCopy, tennisSetLength)).toBeCloseTo(0);

  mutateNonLeafNodeIntoLeafOne(tennisTreeCopy.childNodes.Rain);
  const treeMissProbability = (1 - 3 / 5) * (5 / 14);
  expect(getMissClassificationRateOfTree(tennisTreeCopy, tennisSetLength)).toBeCloseTo(treeMissProbability);
});


test('getMissClassificationRateOfNode', () => {
  const nodeToGetErrorRate = tennisTree.childNodes.Sunny;
  expect(getMissClassificationRateOfNode(nodeToGetErrorRate, tennisSetLength)).toBeCloseTo((1 - 3 / 5) * (5 / tennisSetLength));
});


test('getAlphaForNode', () => {
  const nodeToTest = tennisTree.childNodes.Sunny;
  const expectedAlpha = (1 - 3 / 5) * (5 / tennisSetLength) - (0);
  expect(getAlphaForNode(nodeToTest, tennisSet.length)).toBeCloseTo(expectedAlpha);
});

test('getAlphasAndSubTreesForFullTree', () => {
  // @ts-ignore - true false instead of strings in childNodes
  const alphasAndTrees = getAlphasAndSubTreesForFullTree(titanicTree);

  const firstOne = alphasAndTrees[0];
  const lastOne = alphasAndTrees[alphasAndTrees.length - 1];
  const secondFromEnd = alphasAndTrees[alphasAndTrees.length - 2];

  // last subtree should be just root node
  // @ts-ignore
  expect(getNumberOfTreeNodes(lastOne.subTree)).toBe(1);
  expect(lastOne.alpha > secondFromEnd.alpha);
  expect(firstOne.alpha < secondFromEnd.alpha && secondFromEnd.alpha < lastOne.alpha).toBeTruthy();
});

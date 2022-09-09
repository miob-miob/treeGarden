import {
  getAlphaForNode,
  getAlphasAndSubTreesForFullTree,
  getMissClassificationRateOfNode,
  getMissClassificationRateOfTree,
  getSubTreeThanMinimizesCostComplexityForGivenAlpha
} from './costComplexityPruning';
import {
  getTreeCopy, mutateNonLeafNodeIntoLeafOne, TreeGardenNode
} from '../treeNode';
import { tennisTree } from '../sampleTrainedTrees/tennisTree';
import { titanicTree } from '../sampleTrainedTrees/titanicTree';
import { tennisSet } from '../sampleDataSets';
import { getNumberOfTreeNodes } from '../statistic/treeStats';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';

const config = buildAlgorithmConfiguration(tennisSet, {});
const tennisSetLength = tennisSet.length;
test('getMissClassificationRateOfTree', () => {
  const tennisTreeCopy = getTreeCopy(tennisTree);
  expect(getMissClassificationRateOfTree(tennisTreeCopy, tennisSetLength, config)).toBeCloseTo(0);

  mutateNonLeafNodeIntoLeafOne(tennisTreeCopy.childNodes.Rain);
  const treeMissProbability = (1 - 3 / 5) * (5 / 14);
  expect(getMissClassificationRateOfTree(tennisTreeCopy, tennisSetLength, config)).toBeCloseTo(treeMissProbability);
});


test('getMissClassificationRateOfNode', () => {
  const nodeToGetErrorRate = tennisTree.childNodes.Sunny;
  expect(getMissClassificationRateOfNode(nodeToGetErrorRate, tennisSetLength, config)).toBeCloseTo((1 - 3 / 5) * (5 / tennisSetLength));
});


test('getAlphaForNode', () => {
  const nodeToTest = tennisTree.childNodes.Sunny;
  const expectedAlpha = (1 - 3 / 5) * (5 / tennisSetLength) - (0);
  expect(getAlphaForNode(nodeToTest, tennisSet.length, config)).toBeCloseTo(expectedAlpha);
});

test('getAlphasAndSubTreesForFullTree', () => {
  // @ts-ignore - true false instead of strings in childNodes
  const alphasAndTrees = getAlphasAndSubTreesForFullTree(titanicTree, 2);

  const firstOne = alphasAndTrees[0];
  const lastOne = alphasAndTrees[alphasAndTrees.length - 1];
  const secondFromEnd = alphasAndTrees[alphasAndTrees.length - 2];

  // last subtree should be just root node
  // @ts-ignore
  expect(getNumberOfTreeNodes(lastOne.subTree)).toBe(1);
  expect(lastOne.alpha > secondFromEnd.alpha);
  expect(firstOne.alpha < secondFromEnd.alpha && secondFromEnd.alpha < lastOne.alpha).toBeTruthy();
});

test('getSubTreeThanMinimizesCostComplexityForGivenAlpha', () => {
  const treeWithLotOfNodes = getSubTreeThanMinimizesCostComplexityForGivenAlpha(titanicTree as any as TreeGardenNode, 0, config);
  const treeThatShouldBeJustRoot = getSubTreeThanMinimizesCostComplexityForGivenAlpha(titanicTree as any as TreeGardenNode, 2, config);
  expect(getNumberOfTreeNodes(treeWithLotOfNodes)).toBeGreaterThan(15);
  expect(getNumberOfTreeNodes(treeThatShouldBeJustRoot)).toBe(1);
});

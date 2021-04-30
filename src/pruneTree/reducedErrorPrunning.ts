/* eslint-disable import/no-cycle */
import {
  getAllNonLeafNodes, getNumberOfTreeNodes, getTreeCopy, getTreeNodeById, mutateNonLeafNodeIntoLeafOne, TreeGardenNode
} from '../treeNode';
import { DataSetSample } from '../dataSet/set';
import { AlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { getTreeAccuracy } from '../statistic/treeStats';

// simple implementation - prefer trees  with best accuray

export const getPrunedTreeScore = (
  accuracyBeforePruning:number,
  accuracyAfterPruning:number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  numberOfRemovedNodes:number
) => accuracyAfterPruning - accuracyBeforePruning;


// todo do painful unit test testing
// this will make copy of tree
export const getPrunedTreeByReducedErrorPruning = (treeRoot:TreeGardenNode, validationDataSet:DataSetSample[], configuration:AlgorithmConfiguration) => {
  let currentTree = getTreeCopy(treeRoot);
  let currentScore = 0;
  while (currentScore >= 0) {
    const treesAndScores = getAllNonLeafNodes(currentTree)
    // eslint-disable-next-line @typescript-eslint/no-loop-func
      .map((consideredNode) => {
        const treeCopy = getTreeCopy(currentTree);
        const accuracyBeforePruning = getTreeAccuracy(treeCopy, validationDataSet, configuration);
        const prunedNode = getTreeNodeById(treeCopy, consideredNode.id);
        mutateNonLeafNodeIntoLeafOne(prunedNode);
        const accuracyAfterPruning = getTreeAccuracy(treeCopy, validationDataSet, configuration);
        return {
          tree: treeCopy,
          score: configuration.reducedErrorPruningGetScore(accuracyBeforePruning, accuracyAfterPruning, getNumberOfTreeNodes(treeCopy))
        };
      });
    const { score, tree } = treesAndScores.sort((a, b) => b.score - a.score)[0];
    currentTree = tree;
    currentScore = score;
  }
  return currentTree;
};
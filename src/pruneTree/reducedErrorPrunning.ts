/* eslint-disable import/no-cycle */
import {
  getAllInnerNodes, getTreeCopy, getTreeNodeById, mutateNonLeafNodeIntoLeafOne, TreeGardenNode
} from '../treeNode';
import { TreeGardenDataSample } from '../dataSet/set';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getNumberOfTreeNodes } from '../statistic/treeStats';
import { getDataSetWithReplacedValues } from '../dataSet/replaceMissingValues';


// todo consider if this should not be more low level, like tree prior pruning tree after pruning and should return number
/**
 * Simple implementation of scoring trees before and after pruning. Used by reduced error pruning.
 * Simply prefer trees  with best accuracy - do not count in number of nodes in new tree (feel fre to implement custom solution)
 */
export const getPrunedTreeScore = (
  accuracyBeforePruning:number,
  accuracyAfterPruning:number,
  _numberOfNodesInPrunedTree:number
) => accuracyAfterPruning - accuracyBeforePruning;


/**
 * *Reduced error pruning* (REP) is simplest pre-pruning algorithm tree-garden implements. Even so simple there exists multiple
 * variants of this algorithm.
 *
 * tree-garden`s version is iterative algorithm.
 *
 * - takes all inner nodes (all nodes except leaves) in each iteration
 * - tries to turn each inner node into leaf and then measures accuracy against **validation** data set
 * - keeps change, which leads to highest accuracy gain against validation data set, run new iteration
 * - keeps pruning until there is node after which removal accuracy against validation dataset raised
 *
 *
 * **Pros:**
 *
 * - easily understandable
 * - high quality trees on output if validation set is big enough
 * - computationally effective
 *
 * **Cons:**
 *
 * - need for validation data set, you cannot use all your data for training model
 * - sometimes special pruning data set is used (trained on one part of your data set, pruned on another and validated on last one)
 *   this, if your data are expensive (like outcome of some expensive experiment) you probably do not want use this pruning method
 *
 */
export const getPrunedTreeByReducedErrorPruning = (treeRoot:TreeGardenNode, pruningDataSet:TreeGardenDataSample[], configuration:TreeGardenConfiguration) => {
  const readyToGoValidationSet = getDataSetWithReplacedValues({ samplesToReplace: pruningDataSet, algorithmConfiguration: configuration });
  let currentTree = getTreeCopy(treeRoot);
  while (true) {
    const treesAndScores = getAllInnerNodes(currentTree)
    // eslint-disable-next-line @typescript-eslint/no-loop-func
      .map((consideredNode) => {
        const treeCopy = getTreeCopy(currentTree);
        const accuracyBeforePruning = configuration.getTreeAccuracy(treeCopy, readyToGoValidationSet, configuration);
        // get same node on tree copy
        const prunedNode = getTreeNodeById(treeCopy, consideredNode.id);
        mutateNonLeafNodeIntoLeafOne(prunedNode);
        const accuracyAfterPruning = configuration.getTreeAccuracy(treeCopy, readyToGoValidationSet, configuration);
        return {
          tree: treeCopy,
          score: configuration.reducedErrorPruningGetScore(accuracyBeforePruning, accuracyAfterPruning, getNumberOfTreeNodes(treeCopy))
        };
      });

    // we ended just with root - can happen when pruning data set is too different from training one
    if (treesAndScores.length === 0) {
      return currentTree;
    }
    const { score, tree } = treesAndScores.sort((a, b) => b.score - a.score)[0];
    if (score < 0) {
      // if score is less then 0 do not perform further pruning and use tree from previous step
      return currentTree;
    }
    currentTree = tree;
  }
};

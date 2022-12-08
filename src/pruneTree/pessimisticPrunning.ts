import {
  getTreeCopy,
  mutateNonLeafNodeIntoLeafOne,
  TreeGardenNode
} from '../treeNode';
import { getMostCommonClassForNode } from '../predict';
import { getNumberOfSamplesInNode } from '../statistic/treeStats';

// disclaimer this is just copy paste from http://www-scf.usc.edu/~csci567/21-penalty-methods.pdf
// i dunno understand statistic behind it
// todo learn it!
const zalpha2 = 1.150;
export const getPessimisticErrorOfNode = (treeNode:TreeGardenNode) => {
  const samplesInNode = getNumberOfSamplesInNode(treeNode);
  const mostCommonClass = getMostCommonClassForNode(treeNode);
  const wrongSamples = samplesInNode - treeNode.classCounts[mostCommonClass];
  // Laplace estimate of error rate
  const prob = (wrongSamples + 1.0) / (samplesInNode + 2.0);
  return samplesInNode * (prob + zalpha2 * Math.sqrt((prob * (1.0 - prob)) / (samplesInNode + 2.0)));
};


export const recursivePruning = (treeNode:TreeGardenNode) => {
  const pessimisticError = getPessimisticErrorOfNode(treeNode);
  if (treeNode.isLeaf) {
    return pessimisticError;
  }
  const errorOfChildNodes = Object.values(treeNode.childNodes!)
    .reduce((error, node) => error + recursivePruning(node), 0) as number;
  if (pessimisticError < errorOfChildNodes) {
    mutateNonLeafNodeIntoLeafOne(treeNode);
    return pessimisticError;
  }
  return errorOfChildNodes;
};

/**
 * *Pessimistic pruning* is post pruning strategy employed by c4.5 algorithm. Based just on statistics of tree itself.
 *
 * **Pros:**
 *
 * - You do not need separate pruning data set - you do just need tree itself!
 * - Computationally cheap compared to cost complexity pruning
 *
 * **Cons:**
 *
 * - Sometimes under-prune tree - resulting tree is unnecessary large
 */
export const getPrunedTreeByPessimisticPruning = (tree:TreeGardenNode) => {
  const treeCopy = getTreeCopy(tree);
  recursivePruning(treeCopy);
  return treeCopy;
};


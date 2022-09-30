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


export const getPrunedTreeByPessimisticPruning = (tree:TreeGardenNode) => {
  const treeCopy = getTreeCopy(tree);
  recursivePruning(treeCopy);
  return treeCopy;
};


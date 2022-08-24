import {
  getAllLeafNodes,
  getAllInnerNodes,
  getMostCommonClassForNode, getTreeCopy,
  mutateNonLeafNodeIntoLeafOne,
  TreeGardenNode
} from '../treeNode';
import { TreeGardenDataSample } from '../dataSet/set';
import { AlgorithmConfiguration } from '../algorithmConfiguration';
import { getKFoldCrossValidationDataSets } from '../dataSet/dividingAndBootstrapping';
import { growTree } from '../growTree';
import { getDataSetWithReplacedValues } from '../dataSet/replaceMissingValues';
import { getNumberOfSamplesInNode, getNumberOfTreeNodes, getTreeAccuracy } from '../statistic/treeStats';
import { getMedian } from '../statistic/medianAndAverage';

// implemented with help of https://online.stat.psu.edu/stat508/lesson/11/11.8/11.8.2, http://mlwiki.org/index.php/Cost-Complexity_Pruning
// https://link.springer.com/content/pdf/10.1023/A:1022604100933.pdf

export const getMissClassificationRateOfNode = (treeNode:TreeGardenNode, nSamplesInTree:number) => {
  const nSamplesInNode = getNumberOfSamplesInNode(treeNode);
  const mostCommonClass = getMostCommonClassForNode(treeNode);
  return (1 - (treeNode.classCounts[mostCommonClass] / nSamplesInNode)) * (nSamplesInNode / nSamplesInTree);
};


// in fact weighted missclasification rate of leaf nodes
export const getMissClassificationRateOfTree = (treeRoot:TreeGardenNode, nSamplesInTree:number) => {
  const leafNodes = getAllLeafNodes(treeRoot);
  return leafNodes.reduce((acc, currentNode) => acc + getMissClassificationRateOfNode(currentNode, nSamplesInTree), 0);
};


export const getAlphaForNode = (
  node:TreeGardenNode,
  nSamplesInWholeDataSet:number
) => {
  // this can happen if there is just one leaf node - which can be true (more classes with same value of attribute)
  const leafNodesMinusOne = getAllLeafNodes(node).length > 1 ? getAllLeafNodes(node).length - 1 : 1;
  const alpha = (
    getMissClassificationRateOfNode(node, nSamplesInWholeDataSet) - getMissClassificationRateOfTree(node, nSamplesInWholeDataSet)) / leafNodesMinusOne;

  if (alpha < 0) {
    return 0;
  }
  return alpha;
};

// todo do better tests
export const getAlphasAndSubTreesForFullTree = (unPrunedTreeRoot:TreeGardenNode) => {
  let currentTree = unPrunedTreeRoot;
  const result : { alpha:number, subTree:TreeGardenNode }[] = [];
  while (getNumberOfTreeNodes(currentTree) > 1) {
    currentTree = getTreeCopy(currentTree);
    const innerNodes = getAllInnerNodes(currentTree);

    const alphasAndNodes = innerNodes.map((node) => [getAlphaForNode(node, getNumberOfSamplesInNode(unPrunedTreeRoot)), node] as const);
    // lets find node/nodes with minimal alpha - also known as weakest links
    const minAlpha = Math.min(...alphasAndNodes.map(([alphaOfInternalNode]) => alphaOfInternalNode));
    // as there can be more of nodes with lowest alpha - prune out them all
    const nodesWithThisMinAlpha = alphasAndNodes.filter(([alpha]) => alpha === minAlpha);
    if (nodesWithThisMinAlpha.length === 0) {
      throw new Error('Some math domain error!!! - NAN as alpha');
    }
    // todo maybe prune just one, which prune less nodes of
    // prune tree and store
    nodesWithThisMinAlpha.forEach(([,node]) => {
      mutateNonLeafNodeIntoLeafOne(node);
    });
    result.push({ alpha: minAlpha, subTree: currentTree });
  }
  return result;
};


export const getComplexityScoreForGivenTreeAndAlpha = (treeRoot:TreeGardenNode, alpha:number) => {
  const nSamplesInTree = getNumberOfSamplesInNode(treeRoot);
  return getMissClassificationRateOfTree(treeRoot, nSamplesInTree) + getAllLeafNodes(treeRoot).length * alpha;
};

export const getSubTreeThanMinimizesCostComplexityForGivenAlpha = (fullTree:TreeGardenNode, alpha :number) => {
  // alphas produced are ignored, we are just interested in set of subtrees, and we will get one
  // that minimizes costComplexityScore score = missClassificationRate  + (numberOfLeafNodes) * alpha
  const consideredSubtreesAndComplexityScore = getAlphasAndSubTreesForFullTree(fullTree)
    .map(({ subTree }) => ({ costComplexityScore: getComplexityScoreForGivenTreeAndAlpha(subTree, alpha), subTree }));
  // lets choose tree with minimal score
  return consideredSubtreesAndComplexityScore
    .sort((a, b) => {
      const numberOfNodesA = getNumberOfTreeNodes(a.subTree);
      const numberOfNodesB = getNumberOfTreeNodes(b.subTree);
      if (a.costComplexityScore < b.costComplexityScore) {
        return -1;
      }
      if (a.costComplexityScore > b.costComplexityScore) {
        return 1;
      }
      if (numberOfNodesA > numberOfNodesB) {
        return -1;
      }
      if (numberOfNodesA < numberOfNodesB) {
        return 1;
      }
      return 0;
    })[0].subTree;
};

export const getPrunedTreeByCostComplexityPruning = (treeRoot:TreeGardenNode, fullTrainingData:TreeGardenDataSample[], configuration:AlgorithmConfiguration) => {
  if (configuration.treeType === 'regression') {
    throw new Error('\'getPrunedTreeByCostComplexityPruning\' can not be used with regression trees!');
  }
  const readyToGoTrainingSet = getDataSetWithReplacedValues({
    samplesToReplace: fullTrainingData,
    algorithmConfiguration: configuration
  });
  const alphasAndSubTrees = getAlphasAndSubTreesForFullTree(treeRoot);
  // alphasAndSubTrees.forEach((item) => {
  //   console.log(item.alpha, getNumberOfTreeNodes(item.subTree));
  // });
  const nFoldCrossValidationSets = getKFoldCrossValidationDataSets(readyToGoTrainingSet, 5);
  const bestAlphaFromEachTree = nFoldCrossValidationSets.map(({ validation, training }) => {
    const fullTree = growTree(configuration, training);

    // best scoring alphas
    const bestAlphas = alphasAndSubTrees
      .map(({ alpha }) => {
        const treeForAlpha = getSubTreeThanMinimizesCostComplexityForGivenAlpha(fullTree, alpha);
        const accuracy = getTreeAccuracy(treeForAlpha, validation, configuration);
        return { accuracy, alpha };
      })
      .sort((a, b) => b.accuracy - a.accuracy);
    const alphasForSameAccuracy = bestAlphas
      .filter(({ accuracy }) => accuracy === bestAlphas[0].accuracy)
      .map(({ alpha }) => alpha);
    return getMedian(alphasForSameAccuracy);
  });

  const chosenAlpha = getMedian(bestAlphaFromEachTree);
  const closestALphas = alphasAndSubTrees
    .map(({ alpha, subTree }) => ({
      sortValue: Math.abs(chosenAlpha - alpha),
      alpha,
      subTree
    }))
    .sort((a, b) => a.sortValue - b.sortValue);

  // our tree
  return closestALphas[0].subTree;
};



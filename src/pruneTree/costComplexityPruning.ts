import {
  getAllLeafNodes,
  getAllNonLeafNodes,
  getMostCommonClassForNode, getNumberOfSamplesInNode,
  getNumberOfTreeNodes,
  getTreeCopy,
  mutateNonLeafNodeIntoLeafOne,
  TreeGardenNode
} from '../treeNode';
import { DataSetSample } from '../dataSet/set';
import { AlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { getNFoldCrossValidationDataSets } from '../dataSet/dividingAndBootstrapping';
import { induceTree } from '../induceTree';
import { getDataSetWithReplacedValues } from '../dataSet/replaceMissingValues';
import { getTreeAccuracy } from '../statistic/treeStats';
import { getArithmeticAverage, getMedian } from '../statistic/getMedian';

// implemented with help of https://online.stat.psu.edu/stat508/lesson/11/11.8/11.8.2, http://mlwiki.org/index.php/Cost-Complexity_Pruning


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

export const getAlphasAndSubTreesForFullTree = (unPrunedTreeRoot:TreeGardenNode) => {
  let currentTree = unPrunedTreeRoot;
  const result : { alpha:number, subTree:TreeGardenNode }[] = [];
  while (getNumberOfTreeNodes(currentTree) > 1) {
    currentTree = getTreeCopy(currentTree);
    const innerNodes = getAllNonLeafNodes(currentTree);

    const alphasAndNodes = innerNodes.map((node) => [getAlphaForNode(node, getNumberOfSamplesInNode(unPrunedTreeRoot)), node] as const);

    // lets find node/nodes with minimal alpha - also known as weakest links
    const minAlpha = Math.min(...alphasAndNodes.map(([alphaOfInternalNode]) => alphaOfInternalNode));

    // as there can be more of nodes with lowest alpha - prune out them all
    const nodesWithThisMinAlpha = alphasAndNodes.filter(([alpha]) => alpha === minAlpha);
    if (nodesWithThisMinAlpha.length === 0) {
      throw new Error('Some math domain error!!! - NAN as alpha');
    }
    // prune tree and store
    nodesWithThisMinAlpha.forEach(([,node]) => {
      mutateNonLeafNodeIntoLeafOne(node);
    });
    result.push({ alpha: minAlpha, subTree: currentTree });
  }
  return result;
};

export const getPrunedTreeByCostComplexityPruning = (treeRoot:TreeGardenNode, fullTrainingData:DataSetSample[], configuration:AlgorithmConfiguration) => {
  const readyToGoTrainingSet = getDataSetWithReplacedValues({
    samplesToReplace: fullTrainingData,
    algorithmConfiguration: configuration
  });
  const alphasAndSubTrees = getAlphasAndSubTreesForFullTree(treeRoot);
  alphasAndSubTrees.forEach((item) => {
    console.log(item.alpha, getNumberOfTreeNodes(item.subTree));
  });
  const nFoldCrossValidationSets = getNFoldCrossValidationDataSets(readyToGoTrainingSet, 10);
  const bestAlphaFromEachTree = nFoldCrossValidationSets.map(({ validation, training }) => {
    const fullTree = induceTree(configuration, training);
    const alphasAndAccuracy = getAlphasAndSubTreesForFullTree(fullTree).map(
      ({ subTree, alpha }) => ({ alpha, accuracy: getTreeAccuracy(subTree, validation, configuration), n: getNumberOfTreeNodes(subTree) })
    ).sort((a, b) => b.accuracy - a.accuracy);
    const mostAccurate = alphasAndAccuracy[0];
    console.log(mostAccurate);
    return mostAccurate.alpha;
  });

  console.log(bestAlphaFromEachTree);
  console.log(getMedian(bestAlphaFromEachTree), 'median');
  console.log(getArithmeticAverage(bestAlphaFromEachTree), 'average');
  // todo find closests alpha on original one and use given tree
};



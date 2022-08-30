/* eslint-disable import/no-cycle */
// stopping  - pre-pruning

import { getClassesOfDataSet } from '../dataSet/set';
import { TreeGardenNode } from '../treeNode';
import { AlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { getNumberOfSamplesInNode } from '../statistic/treeStats';


type StopperFn = (currentNode:TreeGardenNode, configuration:AlgorithmConfiguration)=>boolean;
export const composeStopFunctions = (...stopFunctions:StopperFn[]) => (
  currentNode:TreeGardenNode,
  configuration:AlgorithmConfiguration
) => stopFunctions.some((stopFn) => stopFn(currentNode, configuration));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopIfPure = (currentNode:TreeGardenNode, configuration:AlgorithmConfiguration) => {
  if (!currentNode.dataPartitions) {
    throw new Error('Node has no partitions!');
  }
  const wholeIncomingSet = Object.values(currentNode.dataPartitions).flat(1);
  // incoming data are pure
  return getClassesOfDataSet(wholeIncomingSet).length === 1;
};

export const stopIfMinimalNumberOfSamplesInLeafNode = (
  nSamples = 5

) => (currentNode:TreeGardenNode, _configuration:AlgorithmConfiguration) => getNumberOfSamplesInNode(currentNode) <= nSamples;

export const stopIfNoSplitsAvailable = (currentNode:TreeGardenNode, _configuration:AlgorithmConfiguration) => currentNode.bestSplits.length <= 1;

// first depth  level is zero
export const stopIfDepthIs = (maxDepth:number) => (currentNode:TreeGardenNode, _configuration:AlgorithmConfiguration) => currentNode.depth >= maxDepth;

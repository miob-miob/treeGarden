/* eslint-disable import/no-cycle */
// stopping  - pre-pruning

import { getClassesOfDataSet } from '../dataSet/set';
import { getNumberOfSamplesInNode, TreeGardenNode } from '../treeNode';
import { AlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';


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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => (currentNode:TreeGardenNode, configuration:AlgorithmConfiguration) => getNumberOfSamplesInNode(currentNode) <= nSamples;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopIfNoSplitsAvailable = (currentNode:TreeGardenNode, configuration:AlgorithmConfiguration) => currentNode.bestSplits.length <= 1;



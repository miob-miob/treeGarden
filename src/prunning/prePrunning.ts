/* eslint-disable */
// stopping  - pre-pruning

import { getClassesOfDataSet } from '../dataSet/set';
import { TreeGardenNode } from '../treeNode';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopIfNoSplitsAvailable = (currentNode:TreeGardenNode, configuration:AlgorithmConfiguration) => {
  if (!currentNode.bestSplits || currentNode.bestSplits.length === 0) {
    throw new Error('Tou probably solving uninitialized node!');
  }
  return currentNode.bestSplits.length === 1;
};



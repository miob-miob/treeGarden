/* eslint-disable import/no-cycle */

// stopping  - pre-pruning
import { getClassesOfDataSet } from '../dataSet/set';
import { TreeGardenNode } from '../treeNode';
import { TreeGardenConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { getNumberOfSamplesInNode } from '../statistic/treeStats';


type StopperFn = (currentNode:TreeGardenNode, configuration:TreeGardenConfiguration)=>boolean;
export const stopRules = (...stopFunctions:StopperFn[]) => (
  currentNode:TreeGardenNode,
  configuration:TreeGardenConfiguration
) => stopFunctions.some((stopFn) => stopFn(currentNode, configuration));

// samples of just one class in node => further splitting is meaningless
// this is embedded into learning algorithm itself
export const stopIfPure = (currentNode:TreeGardenNode, _configuration:TreeGardenConfiguration) => {
  if (!currentNode.dataPartitions) {
    throw new Error('Node has no partitions!');
  }
  const wholeIncomingSet = Object.values(currentNode.dataPartitions).flat(1);
  // incoming data are pure
  return getClassesOfDataSet(wholeIncomingSet).length === 1;
};

// if number of samples in node is n or lower do not allow further splitting
export const stopIfMinimalNumberOfSamplesInNode = (nSamples = 5) => (
  currentNode:TreeGardenNode,
  _configuration:TreeGardenConfiguration
) => getNumberOfSamplesInNode(currentNode) <= nSamples;

// this is embedded into learning algorithm itself
export const stopIfNoSplitsAvailable = (currentNode:TreeGardenNode, _configuration:TreeGardenConfiguration) => currentNode.bestSplits.length <= 1;

// first depth  level is zero
// if you want just stubs, set it to zero
export const stopIfDepthIs = (maxDepth:number) => (currentNode:TreeGardenNode, _configuration:TreeGardenConfiguration) => currentNode.depth >= maxDepth;

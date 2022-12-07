/* eslint-disable import/no-cycle */

import { getClassesOfDataSet } from '../dataSet/set';
import { TreeGardenNode } from '../treeNode';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getNumberOfSamplesInNode } from '../statistic/treeStats';


type StopperFn = (currentNode:TreeGardenNode, configuration:TreeGardenConfiguration)=>boolean;

/**
 * Implementation of pre-pruning.
 *
 * This function will compose stopper functions into single one, [see pre-pruning example](../../../importantBasics#pre-pruning).
 */
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

/**
 * Implementation of pre-pruning.
 *
 * [see pre-pruning example](../../../importantBasics#pre-pruning)
 * @param nSamples if number of samples in node is `nSamples` or lower do not allow further splitting
 */
export const stopIfMinimalNumberOfSamplesInNode = (nSamples = 5) => (
  currentNode:TreeGardenNode,
  _configuration:TreeGardenConfiguration
) => getNumberOfSamplesInNode(currentNode) <= nSamples;

// this is embedded into learning algorithm itself
export const stopIfNoSplitsAvailable = (currentNode:TreeGardenNode, _configuration:TreeGardenConfiguration) => currentNode.bestSplits.length <= 1;

/**
 * Implementation of pre-pruning.
 *
 * Stop growth of tree if depth reaches given `maxDepth`. [see pre-pruning example](../../../importantBasics#pre-pruning)
 * @param maxDepth depth starts with `zero` - that means if you set depth `1` root node will have one row of children
 */
export const stopIfDepthIs = (maxDepth:number) => (currentNode:TreeGardenNode, _configuration:TreeGardenConfiguration) => currentNode.depth >= maxDepth;

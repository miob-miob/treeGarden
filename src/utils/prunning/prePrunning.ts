// stopping  - pre-pruning

import { getClassesOfDataSet } from '../dataSet/set';
// eslint-disable-next-line import/no-cycle
import { TreeGardenNode } from '../treeNode';


// todo because cyclic dependency we must crippple algorith config for now
type AlgorithmConfig = { [key:string]:any };

type StopperFn = (currentNode:TreeGardenNode, configuration:AlgorithmConfig)=>boolean;
export const composeStopFunctions = (...stopFunctions:StopperFn[]) => (currentNode:TreeGardenNode, configuration:AlgorithmConfig) => {
  for (let index = 0; index < stopFunctions.length; index += 1) {
    const stopper = stopFunctions[index];
    if (stopper(currentNode, configuration)) {
      return true;
    }
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopIfPure = (currentNode:TreeGardenNode, configuration:AlgorithmConfig) => {
  if (!currentNode.dataPartitions) {
    throw new Error('Node has no partitions!');
  }
  const wholeIncomingSet = Object.values(currentNode.dataPartitions).flat(1);
  // incoming data are pure
  return getClassesOfDataSet(wholeIncomingSet).length === 1;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopIfNoSplitsAvailable = (currentNode:TreeGardenNode, configuration:AlgorithmConfig) => {
  if (!currentNode.bestSplits || currentNode.bestSplits.length === 0) {
    throw new Error('Tou probably solving uninitialized node!');
  }
  return currentNode.bestSplits.length === 1;
};



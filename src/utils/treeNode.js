import {
  getAllPossibleSplitCriteriaForDataSet,
  getBestScoringSplits,
  getSplitCriteriaFn,
  splitDataSet
} from './dataSet/split';
import { getClassesOfDataSet } from './dataSet/set';


const defaultTreeNode = {
  parentNode: null,
  childrenNodes: null, // {"value":treeNode, "anotherValue":treeNode}
  isLeaf: false,
  chosenSplitCriteria: null, // best scoring split criteria
  impurityScore: null, // score of best split
  bestSplits: null, // splits and scores
  dataPartitions: null // split outcome - {tag:[sample,sample,sample]}

  // todo lets keeps whole partitions - memory usage will be optimized later
  // todo dataPartitionsCounts: undefined, // split outcome - just numbers {tag:{classOne:number,classTwo:number},tag:{...}}}
};

export const createTreeNode = (node = {}) => ({ ...defaultTreeNode, ...node });


export const getAlreadyUsedCriteria = (treeNode) => {
  const result = [];
  let currentNode = treeNode;
  while (currentNode) {
    result.push(currentNode.chosenSplitCriteria);
    currentNode = currentNode.parentNode;
  }
  return result;
};


export const dataSetToTreeNode = (dataSet, configuration, parentNode) => {
  const possibleSplits = getAllPossibleSplitCriteriaForDataSet(dataSet, configuration, getAlreadyUsedCriteria(parentNode));
  const bestScoringCriteria = getBestScoringSplits(dataSet, possibleSplits, configuration);
  if (bestScoringCriteria.length === 0) {
    throw new Error("No best scroring criteria in 'dataSetToTreeNode' function call!");
  }
  const { split: winnerCriteria, score: winnerScore } = bestScoringCriteria[0];
  const spliterFn = getSplitCriteriaFn(...winnerCriteria);
  const partitions = splitDataSet(dataSet, spliterFn, configuration.onlyBinarySplits);
  return createTreeNode({
    chosenSplitCriteria: winnerCriteria,
    impurityScore: winnerScore,
    bestSplits: bestScoringCriteria,
    dataPartitions: partitions
  });
};

// todo unit test
export const willTreeGrowFurther = (currentNode, configuration) => {
  const wholeIncomingSet = Object.values(currentNode.dataPartitions).flat(1);

  // small number of items to split
  if (wholeIncomingSet.length <= 3) {
    return false;
  }

  // incoming data are pure
  if (getClassesOfDataSet(wholeIncomingSet).length === 1) {
    return false;
  }

  return true;
};

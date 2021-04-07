/* eslint-disable no-underscore-dangle */
import {
  getAllPossibleSplitCriteriaForDataSet,
  getBestScoringSplits,
  getSplitCriteriaFn,
  splitDataSet
} from './dataSet/split';
import { getClassesOfDataSet } from './dataSet/set';


const defaultTreeNode = {
  childNodes: null, // {"value":treeNode, "anotherValue":treeNode}
  isLeaf: false,
  depth: null,
  alreadyUsedSplits: null, // array of split definitions
  chosenSplitCriteria: null, // best scoring split criteria
  impurityScore: null, // score of best split
  bestSplits: null, // splits and scores
  dataPartitions: null, // split outcome - {tag:[sample,sample,sample]}
  dataPartitionsCounts: null, // {tag:{classOne:3, classTwo:3}, anotherTag:{classOne:1, classTwo:6}}
  classCounts: null // {classOne:8, classTwo:7}
};

export const createTreeNode = (node = {}) => ({ ...defaultTreeNode, ...node });

export const dataPartitionsToDataPartitionCounts = (dataPartitions) => Object.fromEntries(Object.entries(dataPartitions)
  .map(([tag, subset]) => {
    const resultForSubset = {};
    subset.forEach(({ _class }) => {
      if (!resultForSubset[_class]) {
        resultForSubset[_class] = 0;
      }
      resultForSubset[_class] += 1;
    });
    return [tag, resultForSubset];
  }));

export const dataPartitionsToClassCounts = (dataPartitions) => {
  const wholeSet = Object.values(dataPartitions).flat(1);
  const result = {};
  wholeSet.forEach(({ _class }) => {
    if (!result[_class]) {
      result[_class] = 0;
    }
    result[_class] += 1;
  });
  return result;
};


export const dataSetToTreeNode = (dataSet, configuration, parentNode) => {
  const possibleSplits = getAllPossibleSplitCriteriaForDataSet(dataSet, configuration, parentNode?.alreadyUsedSplits ?? []);
  const bestScoringCriteria = getBestScoringSplits(dataSet, possibleSplits, configuration);
  //   todo solve no criteria (should stop)
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
    dataPartitions: partitions,
    dataPartitionsCounts: dataPartitionsToDataPartitionCounts(partitions),
    classCounts: dataPartitionsToClassCounts(partitions),
    depth: parentNode ? parentNode.depth + 1 : 0,
    alreadyUsedSplits: parentNode ? [...parentNode.alreadyUsedSplits, winnerCriteria] : [winnerCriteria]
  });
};

// stopping  - pre-pruning

export const composeStopFunctions = (...stopFunctions) => (currentNode, configuration) => {
  for (let index = 0; index < stopFunctions.length; index += 1) {
    const stopper = stopFunctions[index];
    if (stopper(currentNode, configuration)) {
      return true;
    }
  }
  return false;
};

export const stopIfPure = (currentNode, configuration) => {
  // todo stop if there are no possible splits (unused)
  const wholeIncomingSet = Object.values(currentNode.dataPartitions).flat(1);
  // incoming data are pure
  return getClassesOfDataSet(wholeIncomingSet).length === 1;
};

export const stopIfNoSplitsAvailable = (currentNode, configuration) => currentNode.bestSplits.length === 1;



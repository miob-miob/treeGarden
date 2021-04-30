/* eslint-disable no-underscore-dangle */
import { v4 as uuidV4 } from 'uuid';
import {
  getAllPossibleSplitCriteriaForDataSet,
  getBestScoringSplits,
  getSplitCriteriaFn, SplitCriteriaDefinition,
  splitDataSet
} from './dataSet/split';
import { DataSetSample } from './dataSet/set';
// eslint-disable-next-line import/no-cycle
import { AlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';

export type TreeGardenNode = {
  id:string,
  parentId?:string,
  childNodes?:{ [key:string]:TreeGardenNode },
  isLeaf:boolean,
  depth:number,
  alreadyUsedSplits:SplitCriteriaDefinition[],
  chosenSplitCriteria:SplitCriteriaDefinition, // best scoring split criteria
  impurityScore?:number, // score of best split
  bestSplits:ReturnType<typeof getBestScoringSplits>,
  dataPartitions?:ReturnType<typeof splitDataSet>, // split outcome - {tag:[sample,sample,sample]}
  dataPartitionsCounts:ReturnType<typeof dataPartitionsToDataPartitionCounts>, // {tag:{classOne:3, classTwo:3}, anotherTag:{classOne:1, classTwo:6}}
  classCounts:ReturnType<typeof dataPartitionsToClassCounts> // {classOne:8, classTwo:7}
};


const defaultTreeNode = {
  isLeaf: false
};

// todo consider to keep labels of samples in every node
export const createTreeNode = (node:Partial<TreeGardenNode> = {}) => ({ ...defaultTreeNode, ...node, id: uuidV4() } as TreeGardenNode);

export const dataPartitionsToDataPartitionCounts = (dataPartitions:{ [key:string]:DataSetSample[] }) => Object.fromEntries(Object.entries(dataPartitions)
  .map(([tag, subset]) => {
    const resultForSubset :{ [key:string]:number } = {};
    subset.forEach(({ _class }) => {
      if (!resultForSubset[_class!]) {
        resultForSubset[_class!] = 0;
      }
      resultForSubset[_class!] += 1;
    });
    return [tag, resultForSubset];
  }));

export const dataPartitionsToClassCounts = (dataPartitions:{ [key:string]:DataSetSample[] }) => {
  const wholeSet = Object.values(dataPartitions).flat(1);
  const result:{ [key:string]:number } = {};
  wholeSet.forEach(({ _class }) => {
    if (!result[_class!]) {
      result[_class!] = 0;
    }
    result[_class!] += 1;
  });
  return result;
};

export const dataSetToTreeNode = (dataSet:DataSetSample[], configuration:AlgorithmConfiguration, parentNode?:TreeGardenNode) => {
  const possibleSplits = getAllPossibleSplitCriteriaForDataSet(dataSet, configuration, parentNode?.alreadyUsedSplits ?? []);
  const bestScoringCriteria = getBestScoringSplits(dataSet, possibleSplits, configuration);
  //   todo solve no criteria (should stop)
  if (bestScoringCriteria.length === 0) {
    throw new Error(`No best scoring criteria in 'dataSetToTreeNode' function call! ${JSON.stringify(dataSet)}, ${parentNode!.alreadyUsedSplits}`);
  }
  const { split: winnerCriteria, score: winnerScore } = bestScoringCriteria[0];
  // @ts-expect-error
  const spliterFn = getSplitCriteriaFn(...winnerCriteria);
  const partitions = splitDataSet(dataSet, spliterFn, configuration.onlyBinarySplits);
  const newNode = createTreeNode({
    chosenSplitCriteria: winnerCriteria,
    impurityScore: winnerScore,
    bestSplits: bestScoringCriteria,
    dataPartitions: partitions,
    dataPartitionsCounts: dataPartitionsToDataPartitionCounts(partitions),
    classCounts: dataPartitionsToClassCounts(partitions),
    depth: parentNode ? parentNode.depth + 1 : 0,
    alreadyUsedSplits: parentNode ? [...parentNode.alreadyUsedSplits!, winnerCriteria] : [winnerCriteria]
  });
  if (parentNode) {
    newNode.parentId = parentNode.id;
  }
  return newNode;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMostCommonClassFromNode = (leafNode:TreeGardenNode, sample?:DataSetSample) => {
  const sortedClasses = Object.entries(leafNode.classCounts)
    .sort(([classOne, countOne], [classTwo, countTwo]) => {
      if (countOne === countTwo) {
        if (classOne < classTwo) {
          return -1;
        }
        if (classOne === classTwo) {
          return 0;
        }
        return 1;
      }
      return countTwo - countOne;
    });
  return sortedClasses[0][0];
};

// returns all nodes of tree in array
export const getFlattenTree = (treeRoot:TreeGardenNode):TreeGardenNode[] => {
  if (treeRoot.isLeaf) {
    return [treeRoot];
  }
  return [treeRoot, ...(Object.values(treeRoot.childNodes!).flatMap(getFlattenTree))];
};

export const getAllNonLeafNodes = (treeRoot:TreeGardenNode) => getFlattenTree(treeRoot)
  .filter((node) => !node.isLeaf);

// todo  innerNode=> leaf node
export const getTreeNodeById = (treeRoot:TreeGardenNode, id:string) => {
  const desiredNode = getFlattenTree(treeRoot).find(({ id: currentNodeId }) => currentNodeId === id);
  if (!desiredNode) {
    throw new Error(`There is no node with id: '${id}' on tree${JSON.stringify(treeRoot)}`);
  }
  return desiredNode;
};
export const getTreeCopy = (treeRoot:TreeGardenNode):TreeGardenNode => JSON.parse(JSON.stringify(treeRoot));

// for pruning purposes
export const mutateNonLeafNodeIntoLeafOne = (nonLeafNode:TreeGardenNode) => {
  // eslint-disable-next-line no-param-reassign
  nonLeafNode.isLeaf = true;
  // eslint-disable-next-line no-param-reassign
  delete nonLeafNode.childNodes;
  return nonLeafNode;
};
export const getNumberOfTreeNodes = (treeRoot:TreeGardenNode) => getFlattenTree(treeRoot).length;

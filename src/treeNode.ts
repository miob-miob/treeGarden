/* eslint-disable no-underscore-dangle */
import { v4 as uuidV4 } from 'uuid';
import {
  getAllPossibleSplitCriteriaForDataSet,
  getBestScoringSplits,
  getSplitCriteriaFn,
  SplitCriteriaDefinition,
  splitDataSet
} from './dataSet/split';
import { TreeGardenDataSample } from './dataSet/set';
// eslint-disable-next-line import/no-cycle
import { AlgorithmConfiguration } from './algorithmConfiguration';

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

export const dataPartitionsToDataPartitionCounts = (dataPartitions:{ [key:string]:TreeGardenDataSample[] }) => Object.fromEntries(Object.entries(dataPartitions)
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

export const dataPartitionsToClassCounts = (dataSet:TreeGardenDataSample[]) => dataSet.reduce((result:Record<string, number>, currentSample:TreeGardenDataSample) => {
  if (!result[currentSample._class!]) {
    // eslint-disable-next-line no-param-reassign
    result[currentSample._class!] = 0;
  }
  // eslint-disable-next-line no-param-reassign
  result[currentSample._class!] += 1;
  return result;
}, {});

export const dataSetToTreeNode = (dataSet:TreeGardenDataSample[], configuration:AlgorithmConfiguration, parentNode?:TreeGardenNode) => {
  const possibleSplits = getAllPossibleSplitCriteriaForDataSet(dataSet, configuration, parentNode?.alreadyUsedSplits ?? []);
  const bestScoringCriteria = getBestScoringSplits(dataSet, possibleSplits, configuration);
  let furtherSplittingPossible = true;

  if (bestScoringCriteria.length === 0) {
    //  this is case where there is only one sample in data set ==> no splits available
    furtherSplittingPossible = false;
  }

  const winnerScore = furtherSplittingPossible ? bestScoringCriteria[0].score : NaN;
  const winnerCriteria = furtherSplittingPossible ? bestScoringCriteria[0].split : undefined;
  // @ts-expect-error
  const partitions = furtherSplittingPossible ? splitDataSet(dataSet, getSplitCriteriaFn(...winnerCriteria), configuration.onlyBinarySplits) : {};
  const usedCriteria = parentNode ? [...parentNode.alreadyUsedSplits!] : [];
  if (winnerCriteria) {
    usedCriteria.push(winnerCriteria);
  }
  const newNode = createTreeNode({
    chosenSplitCriteria: winnerCriteria,
    impurityScore: winnerScore,
    bestSplits: bestScoringCriteria,
    dataPartitions: partitions,
    dataPartitionsCounts: dataPartitionsToDataPartitionCounts(partitions),
    classCounts: dataPartitionsToClassCounts(dataSet),
    depth: parentNode ? parentNode.depth + 1 : 0,
    alreadyUsedSplits: usedCriteria
  });
  if (parentNode) {
    newNode.parentId = parentNode.id;
  }
  return newNode;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMostCommonClassForNode = (leafNode:TreeGardenNode, sample?:TreeGardenDataSample) => {
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

export const getAllInnerNodes = (treeRoot:TreeGardenNode) => getFlattenTree(treeRoot)
  .filter((node) => !node.isLeaf);

export const getAllLeafNodes = (treeRoot:TreeGardenNode) => getFlattenTree(treeRoot)
  .filter((node) => node.isLeaf);

// todo  innerNode=> leaf node
export const getTreeNodeById = (treeRoot:TreeGardenNode, id:string) => {
  const desiredNode = getFlattenTree(treeRoot).find(({ id: currentNodeId }) => currentNodeId === id);
  if (!desiredNode) {
    throw new Error(`There is no node with id: '${id}' on tree${JSON.stringify(treeRoot)}`);
  }
  return desiredNode;
};
export const getTreeCopy = <T extends TreeGardenNode>(treeRoot:T):T => JSON.parse(JSON.stringify(treeRoot));

// for pruning purposes
export const mutateNonLeafNodeIntoLeafOne = (nonLeafNode:TreeGardenNode) => {
  // eslint-disable-next-line no-param-reassign
  nonLeafNode.isLeaf = true;
  // eslint-disable-next-line no-param-reassign
  delete nonLeafNode.childNodes;
  return nonLeafNode;
};


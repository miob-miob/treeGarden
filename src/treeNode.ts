/* eslint-disable no-underscore-dangle */
import { getUid } from './utils/uid';
import {
  getAllPossibleSplitCriteriaForDataSet,
  getBestScoringSplits,
  getSplitCriteriaFn,
  SplitCriteriaDefinition,
  splitDataSet
} from './split';
import { TreeGardenDataSample } from './dataSet/set';
// eslint-disable-next-line import/no-cycle
import { TreeGardenConfiguration } from './algorithmConfiguration';
import { getArithmeticAverage, getStandardDeviation } from './statistic/basicStatistic';

/**
 * Data partitions for regression trees - just one class
 */
export const SINGLE_CLASS_FOR_REGRESSION_TREE = 'no_classes_in_regression_tree';

/**
 * TreeGardenNode is object representing one node of tree, under **childNodes**, you can see tags of split and child nodes.
 */
export type TreeGardenNode = {
  /**
   * Every node have unique identifier.
   */
  id:string,

  /**
   * Unique identifier of parent node.
   */
  parentId?:string,

  /**
   * Object of split tags and child nodes.
   */
  childNodes?:{ [key:string]:TreeGardenNode },
  /**
   * Is node leaf or not?
   */
  isLeaf:boolean,

  /**
   *  Depth of node in tree - it starts from zero - root node have depth = `0`.
   */
  depth:number,

  /**
   * Split definitions used from root up to this node.
   */
  alreadyUsedSplits:SplitCriteriaDefinition[],
  /**
   * Best scoring split criteria.
   */
  chosenSplitCriteria:SplitCriteriaDefinition,
  /**
   * Score of chosen best split criteria.
   */
  impurityScore?:number,
  /**
   * Array of best scoring splits and respective scores - amount of kept split can be set in configuration.
   */
  bestSplits:ReturnType<typeof getBestScoringSplits>,
  /**
   * Basically split function product - tags and samples - it is thrown away if no longer needed
   * to change this behaviour, see `keepFullLearningData` in configuration.
   * It should look, like that: `{'tag':[sample,anotherSample],'anotherTag':[sample,anotherSample,nextSample]}`
   */
  dataPartitions?:ReturnType<typeof splitDataSet>,
  /**
   * Counts of samples behind each tag, divided by classes, it should look like: `{tag:{classOne:3, classTwo:3}, anotherTag:{classOne:1, classTwo:6}}`
   */
  dataPartitionsCounts:ReturnType<typeof dataPartitionsToDataPartitionCounts>,
  /**
   * count of samples by class, should look like: `{classOne:8, classTwo:7}`
   */
  classCounts:ReturnType<typeof dataPartitionsToClassCounts>,

  /**
   * Average outcome of samples of regression tree in this node.
   */
  regressionTreeAverageOutcome?:number
  /**
   * Standard deviation calculated from values of samples of regression tree in this node.
   */
  regressionTreeStandardDeviation?:number
};


const defaultTreeNode = {
  isLeaf: false
};

// todo consider to keep labels of samples in every node (use median value)
export const createTreeNode = (node:Partial<TreeGardenNode> = {}) => ({ ...defaultTreeNode, ...node, id: getUid() } as TreeGardenNode);

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

export const dataPartitionToPartitionCountsForRegressionTrees = (dataPartitions:{ [key:string]:TreeGardenDataSample[] }) => Object.fromEntries(Object.entries(dataPartitions)
  .map(([tag, subset]) => ([tag, { [SINGLE_CLASS_FOR_REGRESSION_TREE]: subset.length }])));

export const dataPartitionsToClassCounts = (dataSet:TreeGardenDataSample[]) => dataSet.reduce((result:Record<string, number>, currentSample:TreeGardenDataSample) => {
  if (!result[currentSample._class!]) {
    // eslint-disable-next-line no-param-reassign
    result[currentSample._class!] = 0;
  }
  // eslint-disable-next-line no-param-reassign
  result[currentSample._class!] += 1;
  return result;
}, {});

// todo maybe to configuration?
const getAverageOutcomeForDataSet = (dataSet:TreeGardenDataSample[]) => getArithmeticAverage(dataSet.map((sample) => sample._class as number));

export const dataSetToTreeNode = (dataSet:TreeGardenDataSample[], configuration:TreeGardenConfiguration, parentNode?:TreeGardenNode) => {
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

  const regressionTree = configuration.treeType === 'regression';
  const newNode = createTreeNode({
    chosenSplitCriteria: winnerCriteria,
    impurityScore: winnerScore,
    bestSplits: bestScoringCriteria,
    dataPartitions: partitions,
    dataPartitionsCounts: regressionTree ? dataPartitionToPartitionCountsForRegressionTrees(partitions) : dataPartitionsToDataPartitionCounts(partitions),
    classCounts: regressionTree ? { [SINGLE_CLASS_FOR_REGRESSION_TREE]: dataSet.length } : dataPartitionsToClassCounts(dataSet),
    regressionTreeAverageOutcome: regressionTree ? getAverageOutcomeForDataSet(dataSet) : undefined,
    regressionTreeStandardDeviation: regressionTree ? getStandardDeviation(dataSet.map((sample) => sample._class as number)) : undefined,
    depth: parentNode ? parentNode.depth + 1 : 0,
    alreadyUsedSplits: usedCriteria
  });
  if (parentNode) {
    newNode.parentId = parentNode.id;
  }
  return newNode;
};

/**
 * Get array of all nodes in tree.
 */
export const getFlattenTree = (treeRoot:TreeGardenNode):TreeGardenNode[] => {
  if (treeRoot.isLeaf) {
    return [treeRoot];
  }
  return [treeRoot, ...(Object.values(treeRoot.childNodes!).flatMap(getFlattenTree))];
};

/**
 * Get array of all non leaves nodes.
 */
export const getAllInnerNodes = (treeRoot:TreeGardenNode) => getFlattenTree(treeRoot)
  .filter((node) => !node.isLeaf);

/**
 * Get array of all leaves nodes
 */
export const getAllLeafNodes = (treeRoot:TreeGardenNode) => getFlattenTree(treeRoot)
  .filter((node) => node.isLeaf);

/**
 * Returns node object of tree by given 'id', start search in provided root.
 */
export const getTreeNodeById = (treeRoot:TreeGardenNode, id:string) => {
  const desiredNode = getFlattenTree(treeRoot).find(({ id: currentNodeId }) => currentNodeId === id);
  if (!desiredNode) {
    throw new Error(`There is no node with id: '${id}' on tree${JSON.stringify(treeRoot)}`);
  }
  return desiredNode;
};

/**
 * Creates deep copy of tree.
 */
export const getTreeCopy = <T extends TreeGardenNode>(treeRoot:T):T => JSON.parse(JSON.stringify(treeRoot));

/**
 * Mutates inner node into leaf one. Used by reduced error pruning.
 */
export const mutateNonLeafNodeIntoLeafOne = (nonLeafNode:TreeGardenNode) => {
  // eslint-disable-next-line no-param-reassign
  nonLeafNode.isLeaf = true;
  // eslint-disable-next-line no-param-reassign
  delete nonLeafNode.childNodes;
  return nonLeafNode;
};


const childEntriesComparator = (entryOne:[string, TreeGardenNode], entryTwo:[string, TreeGardenNode]) => {
  if (entryOne[0].toString() < entryTwo[0].toString()) {
    return -1;
  }
  if (entryOne[0].toString() === entryTwo[0].toString()) {
    return 1;
  }
  return 0;
};

// this is used for visualization
// stages and grouped children

/**
 * Utility used for generating of representation of tree for [tree-garden-visualization](https://github.com/miob-miob/treeGardenVisualization)
 *
 */
export const getTreeStages = (tree:TreeGardenNode) => {
  const result = [[[tree]]];
  while (true) {
    const newStage:TreeGardenNode[][] = [];
    const flatLastStage = result[result.length - 1].flat();
    flatLastStage.forEach((node) => {
      if (!node.isLeaf) {
        newStage.push(Object.entries((node.childNodes!)).sort(childEntriesComparator).map((item) => item[1]));
      }
    });
    if (newStage.length > 0) {
      result.push(newStage);
    } else {
      break;
    }
  }
  return result;
};

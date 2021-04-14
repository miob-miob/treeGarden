/* eslint-disable no-underscore-dangle */
import {
  getAllPossibleSplitCriteriaForDataSet,
  getBestScoringSplits,
  getSplitCriteriaFn, SplitCriteriaDefinition,
  splitDataSet
} from './dataSet/split';
import { DataSetSample } from './dataSet/set';
// eslint-disable-next-line import/no-cycle
import { AlgorithmConfig } from '../algorithmConfiguration/algorithmDefaultConfiguration';

export type TreeGardenNode = {
  childNodes?:{ [key:string]:TreeGardenNode },
  isLeaf:boolean,
  depth?:number,
  alreadyUsedSplits?:SplitCriteriaDefinition[],
  chosenSplitCriteria?:SplitCriteriaDefinition, // best scoring split criteria
  impurityScore?:number, // score of best split
  bestSplits?:ReturnType<typeof getBestScoringSplits>,
  dataPartitions?:ReturnType<typeof splitDataSet>, // split outcome - {tag:[sample,sample,sample]}
  dataPartitionsCounts?:ReturnType<typeof dataPartitionsToDataPartitionCounts>, // {tag:{classOne:3, classTwo:3}, anotherTag:{classOne:1, classTwo:6}}
  classCounts?:ReturnType<typeof dataPartitionsToClassCounts> // {classOne:8, classTwo:7}
};


const defaultTreeNode = {
  isLeaf: false
};


export const createTreeNode = (node:Partial<TreeGardenNode> = {}) => ({ ...defaultTreeNode, ...node });

export const dataPartitionsToDataPartitionCounts = (dataPartitions:{ [key:string]:DataSetSample[] }) => Object.fromEntries(Object.entries(dataPartitions)
  .map(([tag, subset]) => {
    const resultForSubset :{ [key:string]:number } = {};
    subset.forEach(({ _class }) => {
      if (!resultForSubset[_class]) {
        resultForSubset[_class] = 0;
      }
      resultForSubset[_class] += 1;
    });
    return [tag, resultForSubset];
  }));

export const dataPartitionsToClassCounts = (dataPartitions:{ [key:string]:DataSetSample[] }) => {
  const wholeSet = Object.values(dataPartitions).flat(1);
  const result:{ [key:string]:number } = {};
  wholeSet.forEach(({ _class }) => {
    if (!result[_class]) {
      result[_class] = 0;
    }
    result[_class] += 1;
  });
  return result;
};


export const dataSetToTreeNode = (dataSet:DataSetSample[], configuration:AlgorithmConfig, parentNode?:TreeGardenNode) => {
  const possibleSplits = getAllPossibleSplitCriteriaForDataSet(dataSet, configuration, parentNode?.alreadyUsedSplits ?? []);
  const bestScoringCriteria = getBestScoringSplits(dataSet, possibleSplits, configuration);
  //   todo solve no criteria (should stop)
  if (bestScoringCriteria.length === 0) {
    throw new Error("No best scroring criteria in 'dataSetToTreeNode' function call!");
  }
  const { split: winnerCriteria, score: winnerScore } = bestScoringCriteria[0];
  // @ts-expect-error
  const spliterFn = getSplitCriteriaFn(...winnerCriteria);
  const partitions = splitDataSet(dataSet, spliterFn, configuration.onlyBinarySplits);
  return createTreeNode({
    chosenSplitCriteria: winnerCriteria,
    impurityScore: winnerScore,
    bestSplits: bestScoringCriteria,
    dataPartitions: partitions,
    dataPartitionsCounts: dataPartitionsToDataPartitionCounts(partitions),
    classCounts: dataPartitionsToClassCounts(partitions),
    depth: parentNode ? parentNode.depth! + 1 : 0,
    alreadyUsedSplits: parentNode ? [...parentNode.alreadyUsedSplits!, winnerCriteria] : [winnerCriteria]
  });
};



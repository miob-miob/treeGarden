import { c45Config, cartConfig } from './algorithmConfiguration';
import {
  getBootstrappedDataSet,
  getBootstrappedDataSetAndOutOfTheBagRest,
  getDividedSet, getKFoldCrossValidationDataSets
} from './dataSet/dividingAndBootstrapping';
import { getAlgorithmConfigForEachTree } from './algorithmConfiguration/randomForestConfiguration';
import {
  getDataSetWithReplacedValues,
  getMostCommonTagOfSamplesInNode,
  getMostCommonValueFF,
  getMostCommonValueAmongSameClassFF
} from './dataSet/replaceMissingValues';
import {
  getClassesOfDataSet,
  getTypeOfAttribute,
  getAllAttributeIds,
  getAllUniqueValuesOfAttribute,
  getAllValuesOfAttribute
} from './dataSet/set';

import {
  getInformationGainForSplit,
  getInformationGainRatioForSplit
} from './impurity/entropy';
import {
  getGiniIndexForSplit
} from './impurity/gini';
import {
  getScoreForRegressionTreeSplit
} from './impurity/regressionTreeScore';

import {
  getSplitCriteriaFn,
  getAllPossibleSplitCriteriaForDataSet,
  getPossibleSpitCriteriaForContinuousAttribute,
  getPossibleSpitCriteriaForDiscreteAttribute
} from './split';

import {
  titanicTree,
  tennisTree,
  simpleTree,
  simpleRegressionTree,
  titanicTreeTwo
} from './sampleTrainedTrees';

import {
  simpleSet,
  titanicSet,
  simpleSetForRegression,
  housePrices,
  irisSet,
  tennisSet
} from './sampleDataSets';

import {
  getMedian,
  getArithmeticAverage,
  getStandardDeviation,
  getVariance
} from './statistic/basicStatistic';

import {
  getMissClassificationRateRaw,
  getRAbsErrorRaw,
  getNumberOfSamplesInNode,
  getRAbsError,
  getMissClassificationRate,
  getNumberOfTreeNodes,
  getTreeDepth
} from './statistic/treeStats';

import {
  getReadyToPredictSamples,
  getLeafNodesForSamples,
  getLeafNodeOfSample,
  getValueForNode,
  getMostCommonClassForNode,
  getResultFromMultipleTrees
} from './predict';

import {
  getTreeCopy,
  getTreeStages,
  getAllLeafNodes,
  getFlattenTree,
  getAllInnerNodes,
  getTreeNodeById,
  SINGLE_CLASS_FOR_REGRESSION_TREE
} from './treeNode';

import { getOutOfTheBagError } from './statistic/randomForestStats';

export { SplitCriteriaFn, SplitCriteriaDefinition, SplitOperator } from './split';

export { TreeGardenDataSample } from './dataSet/set';
export { TreeGardenNode } from './treeNode';
export {
  TreeGardenConfiguration,
  buildAlgorithmConfiguration,
  defaultConfiguration,
  defaultAttributeConfiguration
} from './algorithmConfiguration';
export { growTree } from './growTree';
export { growRandomForest } from './growRandomForest';
export { getTreePrediction, getRandomForestPrediction } from './predict';
export { getTreeAccuracy } from './statistic/treeStats';
export { getDividedSet } from './dataSet/dividingAndBootstrapping';

export const configuration = {
  c45Config,
  cartConfig,
  getAlgorithmConfigForEachTree
};


export const dataSet = {
  getDividedSet,
  getBootstrappedDataSet,
  getBootstrappedDataSetAndOutOfTheBagRest,
  getKFoldCrossValidationDataSets,
  getMostCommonTagOfSamplesInNode,
  getDataSetWithReplacedValues,
  getMostCommonValueFF,
  getMostCommonValueAmongSameClassFF,
  getClassesOfDataSet,
  getTypeOfAttribute,
  getAllAttributeIds,
  getAllUniqueValuesOfAttribute,
  getAllValuesOfAttribute
};


export const split = {
  getSplitCriteriaFn,
  getPossibleSpitCriteriaForContinuousAttribute,
  getPossibleSpitCriteriaForDiscreteAttribute,
  getAllPossibleSplitCriteriaForDataSet
};

export const impurity = {
  getInformationGainRatioForSplit, // bigger score - better split
  getInformationGainForSplit, // bigger score - better split
  getGiniIndexForSplit, // lower score - better split
  getScoreForRegressionTreeSplit // lower score - better split
};

// todo if we go hardly after bundle size - this would not be ideal
export const sampleTrees = {
  titanicTree,
  titanicTreeTwo,
  tennisTree,
  simpleTree,
  simpleRegressionTree
};

// todo if we go hardly after bundle size - this would not be ideal
export const sampleDataSets = {
  simpleSet,
  titanicSet,
  simpleSetForRegression,
  housePrices,
  irisSet,
  tennisSet
};

export const statistics = {
  getMedian,
  getArithmeticAverage,
  getStandardDeviation,
  getVariance,
  getMissClassificationRateRaw,
  getRAbsErrorRaw,
  getNumberOfSamplesInNode,
  getRAbsError,
  getMissClassificationRate,
  getNumberOfTreeNodes,
  getTreeDepth,
  getOutOfTheBagError
};

export const tree = {
  getTreeCopy,
  getTreeStages,
  getAllLeafNodes,
  getFlattenTree,
  getAllInnerNodes,
  getTreeNodeById
};

export const predict = {
  getReadyToPredictSamples,
  getLeafNodesForSamples,
  getLeafNodeOfSample,
  getValueForNode,
  getMostCommonClassForNode,
  getResultFromMultipleTrees
};

export const constants = {
  SINGLE_CLASS_FOR_REGRESSION_TREE
};

// todo export everything needed by tree garden visualization
// todo  npm package
// todo DOCS

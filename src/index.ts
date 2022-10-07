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

// todo example - how write config with hand without data set
// todo think about exports - public API
// todo  npm package
// todo DOCS

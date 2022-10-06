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
  getSplitCriteriaFn,
  getBestScoringSplits,
  splitDataSet,
  getAllPossibleSplitCriteriaForDataSet,
  getPossibleSpitCriteriaForContinuousAttribute,
  getPossibleSpitCriteriaForDiscreteAttribute
} from './split';

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
  getPossibleSpitCriteriaForDiscreteAttribute
};


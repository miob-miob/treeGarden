// eslint-disable-next-line import/no-cycle
import { getMostCommonTagOfSamplesInNode, getMostCommonValueFF } from '../dataSet/replaceMissingValues';
import { getInformationGainRatioForSplit } from '../impurity/entropy';
import {
  getPossibleSpitCriteriaForContinuousAttribute,
  getPossibleSpitCriteriaForDiscreteAttribute
} from '../split';
// eslint-disable-next-line import/no-cycle
import { stopRules } from '../pruneTree';

// eslint-disable-next-line import/no-cycle
import { getPrunedTreeScore } from '../pruneTree/reducedErrorPrunning';
// eslint-disable-next-line import/no-cycle
import { TreeGardenConfiguration } from './buildAlgorithmConfiguration';
import { getTreeAccuracy } from '../statistic/treeStats';
import { getValueForNode, getMostCommonClassForNode, getResultFromMultipleTrees } from '../predict';
import { getMostCommonValue } from '../statistic/getMostCommonValue';
import { getMedian } from '../statistic/basicStatistic';
import { getSubsetOfAttributesForTreeOfRandomForest } from './randomForestConfiguration';

// todo implement expansivnes of splits derived from given attribute
// todo example (CT scan is muh more expensive than regular X-ray, so it would be nice to have decision tree, that uses X-ray splits over C)

/**
 * Default configuration. See code for more information.
 * */
export const defaultConfiguration: TreeGardenConfiguration = {
  treeType: 'classification',
  attributes: {},
  includedAttributes: [],
  excludedAttributes: [],
  getScoreForSplit: getInformationGainRatioForSplit,
  biggerScoreBetterSplit: true,
  shouldWeStopGrowth: stopRules(),
  numberOfSplitsKept: 3,
  growMissingValueReplacement: getMostCommonValueFF,
  evaluateMissingValueReplacement: getMostCommonValueFF,
  getTagOfSampleWithMissingValueWhileClassifying: getMostCommonTagOfSamplesInNode,
  getClassFromLeafNode: getMostCommonClassForNode,
  getValueFromLeafNode: getValueForNode,
  onlyBinarySplits: false,
  missingValue: undefined as any,
  keepFullLearningData: false,
  getAllPossibleSplitCriteriaForDiscreteAttribute: getPossibleSpitCriteriaForDiscreteAttribute,
  getAllPossibleSplitCriteriaForContinuousAttribute: getPossibleSpitCriteriaForContinuousAttribute,
  reducedErrorPruningGetScore: getPrunedTreeScore,
  costComplexityPruningKFold: 5,
  getTreeAccuracy,

  // ---
  // below are configurations for random forest
  // ---
  numberOfTrees: 27,
  getAttributesForTree: getSubsetOfAttributesForTreeOfRandomForest,
  numberOfBootstrappedSamples: 0,
  calculateOutOfTheBagError: true,
  majorityVoting: getResultFromMultipleTrees,
  mergeClassificationResults: getMostCommonValue,
  mergeRegressionResults: getMedian,

  // ---
  // below are runtime configs !!!
  // ---
  allClasses: undefined, // all classes of initial data set (will be populated automatically)
  buildTime: undefined // check if was not already build
};


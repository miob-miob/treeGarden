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
import { TreeGardenDataSample } from '../dataSet/set';
import { chooseManyWithoutRepeats } from '../randomization';
import { getMostCommonValues } from '../statistic/getMostCommonValue';
import { getMedian } from '../statistic/basicStatistic';

// todo implement expansivnes of splits derived from given attribute
// todo example (CT scan is muh more expensive than regular X-ray, so it would be nice to have decision tree, that uses X-ray splits over C)

export const defaultConfiguration: TreeGardenConfiguration = {
  treeType: 'classification',
  // key is attributeId, value is attributeMeta object
  attributes: {},

  // arrayOfAttributeIds if defined only these attributes re considered for building decision tree
  includedAttributes: [],

  // arrayOfAttributeIds if defined  these attributes are not considered for building decision tree
  excludedAttributes: [],

  // impurity scoring function see default for more information
  getScoreForSplit: getInformationGainRatioForSplit,

  // for information gain bigger score means better split, but for gini, opposite is true
  biggerScoreBetterSplit: true,

  // when this function evaluates to to true then next split will be made if false grow is stopped and node is leaf one
  shouldWeStopGrowth: stopRules(), // example -  stopRules(stopIfMinimalNumberOfSamplesInNode(5), stopIfDepthIs(5))
  // how many splits will be stored on each node
  numberOfSplitsKept: 3,

  // used if attribute does not define its own
  // strategy used during tree induction (learning phase)
  // replace missing values - by default most common value for given attribute is used.
  growMissingValueReplacement: getMostCommonValueFF,

  // used if attribute does not define its own
  // strategy used during evaluation of unknown samples (classification of instances)
  // it exists, because we may need different approach when classifying then when growing
  evaluateMissingValueReplacement: getMostCommonValueFF,

  // missing values replacement delayed to point when samples traverse during induced tree, sample and treeNode is provided
  getTagOfSampleWithMissingValueWhileClassifying: getMostCommonTagOfSamplesInNode,

  // how to obtain class from node where unknown sample lands
  getClassFromLeafNode: getMostCommonClassForNode,

  // how to obtain class from node where unknown sample lands for regression tree
  getValueFromLeafNode: getValueForNode,

  // every node in decision tree can have maximal two branches (true/false) - CART uses usually this condition
  onlyBinarySplits: false,

  // used if attribute does not define its own value which is considered as missing value
  missingValue: undefined as any,

  // keep data partitions in tree nodes do not remove them during training
  keepFullLearningData: false,

  // used if attribute does not define its own
  // way how to generate all possible split points from numerical attribute - place for using some heuristics instead
  // of investigation all possibilities
  getAllPossibleSplitCriteriaForDiscreteAttribute: getPossibleSpitCriteriaForDiscreteAttribute,
  getAllPossibleSplitCriteriaForContinuousAttribute: getPossibleSpitCriteriaForContinuousAttribute,

  // while using reduced errorPruning best scoring tree is kept
  reducedErrorPruningGetScore: getPrunedTreeScore,

  // measure accuracy of tree on given dataset, used while pruning tree during cost complexity pruning or reduced error prunning
  getTreeAccuracy,

  // ---
  // below are configurations for random forest
  // ---
  numberOfTrees: 27, // number of trees in random forest
  // how to choose subset of attributes for each tree
  getAttributesForTree: (algorithmConfiguration:TreeGardenConfiguration, _dataSet:TreeGardenDataSample[]) => {
    const attributeKeys = Object.keys(algorithmConfiguration.attributes);
    const nAttributes = algorithmConfiguration.treeType === 'regression'
      ? Math.ceil(Math.sqrt(attributeKeys.length))
      : Math.ceil(attributeKeys.length / 3);
    return chooseManyWithoutRepeats(attributeKeys, nAttributes);
  },
  numberOfBootstrappedSamples: 0, // number of samples bootstrapped from original dataset - 0 = all,
  calculateOutOfTheBagError: true, // https://en.wikipedia.org/wiki/Out-of-bag_error
  majorityVoting: getResultFromMultipleTrees,
  mergeClassificationResults: (values:string[]) => getMostCommonValues(values)[0],
  mergeRegressionResults: getMedian,

  // ---
  // below are runtime configs !!!
  // ---
  allClasses: undefined, // all classes of initial data set (will be populated automatically)
  buildTime: undefined // check if was not already build
};


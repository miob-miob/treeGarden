import { getMostCommonValueFF } from '../utils/dataSet/replaceMissingValues';
import { getInformationGainForSplit } from '../utils/impurity/entropy';
import { getPossibleSpitCriteriaForContinuousAttribute, getPossibleSpitCriteriaForDiscreteAttribute } from '../utils/dataSet/split';
import { composeStopFunctions, stopIfNoSplitsAvailable, stopIfPure } from '../utils/treeNode';

// todo implement expansivnes of splits derived from given attribute
// todo example (CT scan is muh more expensive than regular X-ray, so it would be nice to have decision tree, that uses X-ray splits over C)
export const defaultConfiguration = {
  // key is attributeId, value is attributeMeta object
  attributes: {},

  // arrayOfAttributeIds if defined only these attributes re considered for building decision tree
  includedAttributes: [],

  // arrayOfAttributeIds if defined  these attributes are not considered for building decision tree
  excludedAttributes: [],

  // impurity scoring function see default for more information
  impurityScoringForSplit: getInformationGainForSplit,

  // for information gain bigger score means better split, but for gini, opposite is true
  biggerImpurityScoreBetterSplit: true,

  // when this function evaluates to to true then next split will be made if false grow is stopped and node is leaf one
  shouldWeStopGrowth: composeStopFunctions(stopIfPure, stopIfNoSplitsAvailable),

  // how many splits will be stored on each node
  numberOfSplitsKept: 3,

  // used if attribute does not define its own
  // strategy used during tree induction (learning phase)
  // replace missing values - by default most common value for given attribute is used.
  induceMissingValueReplacement: getMostCommonValueFF,

  // used if attribute does not define its own
  // strategy used during evaluation of unknown samples (classification of instances)
  evaluateMissingValueReplacement: undefined,

  // every node in decision tree can have maximal two branches (true/false) - CART uses usually this condition
  onlyBinarySplits: false,

  // used if attribute does not define its own value which is considered as missing value
  missingValue: undefined,

  // used if attribute does not define its own
  mapper: undefined,

  // keep data partitions in tree nodes do not remove them during training
  keepFullLearningData: false,

  // used if attribute does not define its own
  // way how to generate all possible split points from numerical attribute - place for using some heuristics instead
  // of investigation all possibilities
  getAllPossibleSplitCriteriaForDiscreteAttribute: getPossibleSpitCriteriaForDiscreteAttribute,
  getAllPossibleSplitCriteriaForContinuousAttribute: getPossibleSpitCriteriaForContinuousAttribute,

  // below are runtime configs !!!
  // all classes of initial data set (will be populated automatically)
  allClasses: undefined,

  // check if was not already build
  buildTime: undefined
};

import { getMostCommonValueFF } from '../utils/dataSet/replaceMissingValues';
import { getInformationGainForSplit } from '../utils/impurity/entropy';
import { getPossibleSpitCriteriaForContinuousAttribute, getPossibleSpitCriteriaForDiscreteAttribute } from '../utils/dataSet/split';

// todo generate metadata and thing node data structure
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
  keepFullLearningData: true,

  // todo propagate it to attribute configuration
  // used if attribute does not define its own
  // way how to generate all possible split points from numerical attribute - place for using some heuristics instead
  // of investigation all possibilities
  getAllPossibleSplitCriteriaForDiscreteAttribute: getPossibleSpitCriteriaForDiscreteAttribute,
  getAllPossibleSplitCriteriaForContinuousAttribute: getPossibleSpitCriteriaForContinuousAttribute
};

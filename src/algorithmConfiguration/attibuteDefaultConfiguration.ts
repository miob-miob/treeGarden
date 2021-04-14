import { getMostCommonValueFF } from '../utils/dataSet/replaceMissingValues';

// configuration for particular attribute
export const defaultAttributeConfiguration = {
  // 'automatic'|'continuous'|'discrete'
  dataType: 'automatic',

  // strategy used during tree induction (learning phase)
  // replace missing values - by default most common value for given attribute is used.
  induceMissingValueReplacement: undefined as typeof getMostCommonValueFF | undefined,

  // strategy used during evaluation of unknown samples (classification of instances)
  evaluateMissingValueReplacement: undefined,

  // which value is considered as missing (by default sample[attributeId] === undefined)
  missingValue: undefined as any,

  // way how to generate all possible split points from numerical attribute - place for using some heuristics instead
  // of investigation all possibilities
  getAllPossibleSplitCriteriaForDiscreteAttribute: undefined,
  getAllPossibleSplitCriteriaForContinuousAttribute: undefined
};

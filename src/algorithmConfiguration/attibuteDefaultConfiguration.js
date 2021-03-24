
// configuration for particular attribute
export const defaultAttributeConfiguration = {
  // 'automatic'|'continuous'|'discrete'
  dataType: 'automatic',

  // similar function like getMostCommonValueFF (factory that will get dataSet and attributeId) and will just map value on something else
  // usable for example when you want to map 'null' into 'undefined' and thus replaced by 'missingValueReplacement'
  mapper: undefined,

  // strategy used during tree induction (learning phase)
  // replace missing values - by default most common value for given attribute is used.
  induceMissingValueReplacement: undefined,

  // strategy used during evaluation of unknown samples (classification of instances)
  evaluateMissingValueReplacement: undefined,

  // which value is considered as missing (by default sample[attributeId] === undefined)
  missingValue: undefined,

  // way how to generate all possible split points from numerical attribute - place for using some heuristics instead
  // of investigation all possibilities
  getAllPossibleSplitCriteriaForDiscreteAttribute: undefined,
  getAllPossibleSplitCriteriaForContinuousAttribute: undefined
};

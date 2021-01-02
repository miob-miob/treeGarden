import { getMostCommonValueFF } from '../utils/dataSet/replaceMissingValues';
import { getInformationGainForSplit } from '../utils/impurity/entropy';


export const defaultConfiguration = {
  // key is attributeId, value is attributeMeta object
  attributesMeta: {},

  // arrayOfAttributeIds if defined only these attributes re considered for building decision tree
  includedAttributes: null,

  // arrayOfAttributeIds if defined  these attributes are not considered for building decision tree
  excludedAttributes: null,

  // impurity scoring function see default for more information
  impurityScoringForSplit: getInformationGainForSplit,

  // used if attribute does not define its own
  missingValueReplacement: getMostCommonValueFF,

  // every node in decision tree can have mnaximal two branches (true/false) - CART uses usually this condition
  onlyBinarySplits: false,

  // used if attribute does not define its own value which is considered as missing value
  missingValue: undefined,

  // used if attribute does not define its own
  mapper: undefined

};

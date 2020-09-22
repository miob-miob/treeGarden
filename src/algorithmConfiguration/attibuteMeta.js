import { getMostCommonValueFF } from '../utils/dataSet/replaceMissingValues';

export const attributeMetaDefault = {
  // 'automatic'|'continuous'|'discrete'
  dataType: 'automatic',

  // similar function like getMostCommonValueFF (factory that will get dataSet and attributeId) and will just map value on something else
  // usable for example when you want to map 'null' into 'undefined' and thus replaced by 'missingValueReplacement'
  mapper: undefined,

  // replace missing values - by default most common value for given attribute is used.
  missingValueReplacement: getMostCommonValueFF
};

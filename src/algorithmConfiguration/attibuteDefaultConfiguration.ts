/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import { getMostCommonValueFF } from '../dataSet/replaceMissingValues';
import { TreeGardenDataSample } from '../dataSet/set';
import { SplitCriteriaDefinition } from '../dataSet/split';
import { AlgorithmConfiguration } from './buildAlgorithmConfiguration';


// todo solve circular dependencies on attribute configuration as well (by hand + default values)
// configuration for particular attribute
export const defaultAttributeConfiguration = {
  // 'automatic'|'continuous'|'discrete'
  dataType: 'automatic' as 'automatic'|'continuous'|'discrete',

  // strategy used during tree induction (learning phase)
  // replace missing values - by default most common value for given attribute is used.
  induceMissingValueReplacement: undefined as typeof getMostCommonValueFF | undefined,

  // strategy used during evaluation of unknown samples (classification of instances)
  evaluateMissingValueReplacement: undefined as typeof getMostCommonValueFF | undefined,

  // which value is considered as missing (by default sample[attributeId] === undefined)
  missingValue: undefined as any,

  // way how to generate all possible split points from numerical attribute - place for using some heuristics instead
  // of investigation all possibilities
  getAllPossibleSplitCriteriaForDiscreteAttribute: undefined as ((
    attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:AlgorithmConfiguration)=>SplitCriteriaDefinition[]) | undefined,
  getAllPossibleSplitCriteriaForContinuousAttribute: undefined as ((
    attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:AlgorithmConfiguration)=>SplitCriteriaDefinition[]) | undefined
};

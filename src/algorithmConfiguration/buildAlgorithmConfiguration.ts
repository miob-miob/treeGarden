/* eslint-disable import/no-cycle */
import { defaultConfiguration } from './algorithmDefaultConfiguration';
import { buildAttributesConfiguration } from './buildAttributesConfiguration';
import { DataSetSample, getClassesOfDataSet } from '../dataSet/set';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
import { TreeGardenNode } from '../treeNode';
import { SplitCriteriaDefinition } from '../dataSet/split';

// We cannot infer this from defaultConfiguration because of cyclic dependency in types of defaultConfiguration
export type AlgorithmConfiguration = {
  attributes:{ [key:string]:typeof defaultAttributeConfiguration },
  includedAttributes: string[],
  excludedAttributes: string[],
  impurityScoringForSplit:(frequenciesOfClasses:number[], frequenciesOfClassesChildren:number[][])=>number,
  biggerImpurityScoreBetterSplit:boolean,
  shouldWeStopGrowth:(node:TreeGardenNode, configuration:AlgorithmConfiguration)=>boolean,
  numberOfSplitsKept: number,
  induceMissingValueReplacement:(dataSet:DataSetSample[], attributeId:string, configuration:AlgorithmConfiguration)=>(sample:DataSetSample)=>any,
  evaluateMissingValueReplacement:(dataSet:DataSetSample[], attributeId:string, configuration:AlgorithmConfiguration)=>(sample:DataSetSample)=>any,
  getTagOfSampleWithMissingValueWhileClassifying?:(sample:DataSetSample, attributeId:string, nodeWhereWeeNeedValue:TreeGardenNode, config:AlgorithmConfiguration)=>any
  getClassFromLeafNode:(node:TreeGardenNode, sample?:DataSetSample)=>string,
  onlyBinarySplits:boolean,
  missingValue:any,
  keepFullLearningData:boolean,
  getAllPossibleSplitCriteriaForDiscreteAttribute:(attributeId:string,
    dataSet:DataSetSample[],
    configuration:AlgorithmConfiguration)=>SplitCriteriaDefinition[],
  getAllPossibleSplitCriteriaForContinuousAttribute:(attributeId:string,
    dataSet:DataSetSample[],
    configuration:AlgorithmConfiguration)=>SplitCriteriaDefinition[],
  reducedErrorPruningGetScore:(accuracyBeforePruning:number, accuracyAfterPruning:number, numberOfRemovedNodes:number)=>number,
  allClasses?:string[],
  buildTime?:number
};
export type PartialConfig = Partial<Omit<AlgorithmConfiguration, 'attributes'> & { attributes?: { [key:string]:Partial<typeof defaultAttributeConfiguration> } }>;
export const buildAlgorithmConfiguration = (dataSet:DataSetSample[], configuration: PartialConfig = {}) => {
  if (configuration.buildTime) {
    throw new Error(`This configuration was already build! ${JSON.stringify(configuration)}`);
  }

  if (!dataSet) {
    throw new Error('Data set that will be used for learning is required in "buildAlgorithmConfiguration" function call.');
  }
  const mergedConfiguration = { ...defaultConfiguration, ...(configuration || {}) } as AlgorithmConfiguration;
  if (!mergedConfiguration.allClasses) {
    mergedConfiguration.allClasses = getClassesOfDataSet(dataSet);
  }
  mergedConfiguration.attributes = buildAttributesConfiguration(mergedConfiguration, dataSet);
  mergedConfiguration.buildTime = Date.now();
  return mergedConfiguration;
};

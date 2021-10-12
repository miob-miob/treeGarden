/* eslint-disable import/no-cycle */
import { defaultConfiguration } from './algorithmDefaultConfiguration';
import { buildAttributesConfiguration } from './buildAttributesConfiguration';
import { TreeGardenDataSample, getClassesOfDataSet } from '../dataSet/set';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
import { TreeGardenNode } from '../treeNode';
import { SplitCriteriaDefinition, SplitCriteriaFn } from '../dataSet/split';

// We cannot infer this from defaultConfiguration because of cyclic dependency in types of defaultConfiguration
export type AlgorithmConfiguration = {
  treeType:'classification' | 'regression',
  attributes:{ [key:string]:typeof defaultAttributeConfiguration },
  includedAttributes: string[],
  excludedAttributes: string[],
  getScoreForSplit:(
    parentDataSet:TreeGardenDataSample[],
    childDataSets:{ [key:string]:TreeGardenDataSample[] },
    config:AlgorithmConfiguration,
    splitter:SplitCriteriaFn
  )=>number,
  biggerScoreBetterSplit:boolean,
  shouldWeStopGrowth:(node:TreeGardenNode, configuration:AlgorithmConfiguration)=>boolean,
  numberOfSplitsKept: number,
  induceMissingValueReplacement:(dataSet:TreeGardenDataSample[], attributeId:string, configuration:AlgorithmConfiguration)=>(sample:TreeGardenDataSample)=>any,
  evaluateMissingValueReplacement:(dataSet:TreeGardenDataSample[], attributeId:string, configuration:AlgorithmConfiguration)=>(sample:TreeGardenDataSample)=>any,
  getTagOfSampleWithMissingValueWhileClassifying?:(sample:TreeGardenDataSample, attributeId:string, nodeWhereWeeNeedValue:TreeGardenNode, config:AlgorithmConfiguration)=>any
  getClassFromLeafNode:(node:TreeGardenNode, sample?:TreeGardenDataSample)=>string,
  onlyBinarySplits:boolean,
  missingValue:any,
  keepFullLearningData:boolean,
  getAllPossibleSplitCriteriaForDiscreteAttribute:(attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:AlgorithmConfiguration)=>SplitCriteriaDefinition[],
  getAllPossibleSplitCriteriaForContinuousAttribute:(attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:AlgorithmConfiguration)=>SplitCriteriaDefinition[],
  reducedErrorPruningGetScore:(accuracyBeforePruning:number, accuracyAfterPruning:number, numberOfRemovedNodes:number)=>number,
  allClasses?:string[],
  buildTime?:number
};
export type PartialAlgorithmConfiguration =
  Partial<Omit<AlgorithmConfiguration, 'attributes'> & { attributes?: { [key:string]:Partial<typeof defaultAttributeConfiguration> } }>;
export const buildAlgorithmConfiguration = (dataSet:TreeGardenDataSample[], configuration: PartialAlgorithmConfiguration = {}) => {
  if (configuration.buildTime) {
    throw new Error(`This configuration was already build! ${JSON.stringify(configuration)}`);
  }

  if (!dataSet) {
    throw new Error('Data set that will be used for learning is required in "buildAlgorithmConfiguration" function call.');
  }
  const mergedConfiguration = { ...defaultConfiguration, ...(configuration || {}) } as AlgorithmConfiguration;
  if (!mergedConfiguration.allClasses) {
    mergedConfiguration.allClasses = mergedConfiguration.treeType === 'classification' ? getClassesOfDataSet(dataSet) : [];
  }
  mergedConfiguration.attributes = buildAttributesConfiguration(mergedConfiguration, dataSet);
  mergedConfiguration.buildTime = Date.now();
  return mergedConfiguration;
};

/* eslint-disable import/no-cycle */
import { defaultConfiguration } from './algorithmDefaultConfiguration';
import { buildAttributesConfiguration } from './buildAttributesConfiguration';
import { TreeGardenDataSample, getClassesOfDataSet } from '../dataSet/set';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
import { TreeGardenNode } from '../treeNode';
import { SplitCriteriaDefinition, SplitCriteriaFn } from '../split';
import { SingleSamplePredictionResult } from '../predict';

// We cannot infer this from defaultConfiguration because of cyclic dependency in types of defaultConfiguration
export type TreeGardenConfiguration = {
  treeType:'classification' | 'regression',
  attributes:{ [key:string]:typeof defaultAttributeConfiguration },
  includedAttributes: string[],
  excludedAttributes: string[],
  getScoreForSplit:(
    parentDataSet:TreeGardenDataSample[],
    childDataSets:{ [key:string]:TreeGardenDataSample[] },
    config:TreeGardenConfiguration,
    splitter:SplitCriteriaFn
  )=>number,
  biggerScoreBetterSplit:boolean,
  shouldWeStopGrowth:(node:TreeGardenNode, configuration:TreeGardenConfiguration)=>boolean,
  numberOfSplitsKept: number,
  growMissingValueReplacement:(dataSet:TreeGardenDataSample[], attributeId:string, configuration:TreeGardenConfiguration)=>(sample:TreeGardenDataSample)=>any,
  evaluateMissingValueReplacement:(dataSet:TreeGardenDataSample[], attributeId:string, configuration:TreeGardenConfiguration)=>(sample:TreeGardenDataSample)=>any,
  getTagOfSampleWithMissingValueWhileClassifying?:(sample:TreeGardenDataSample, attributeId:string, nodeWhereWeeNeedValue:TreeGardenNode, config:TreeGardenConfiguration)=>any
  getClassFromLeafNode:(node:TreeGardenNode, sample?:TreeGardenDataSample)=>string,
  getValueFromLeafNode:(node:TreeGardenNode, sample?:TreeGardenDataSample)=>number,
  onlyBinarySplits:boolean,
  missingValue:any,
  keepFullLearningData:boolean,
  getAllPossibleSplitCriteriaForDiscreteAttribute:(attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:TreeGardenConfiguration)=>SplitCriteriaDefinition[],
  getAllPossibleSplitCriteriaForContinuousAttribute:(attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:TreeGardenConfiguration)=>SplitCriteriaDefinition[],
  costComplexityPruningKFold:number,
  reducedErrorPruningGetScore:(accuracyBeforePruning:number, accuracyAfterPruning:number, numberOfRemovedNodes:number)=>number,
  allClasses?:string[],
  getTreeAccuracy:(
    treeRootNode:TreeGardenNode,
    dataSet:TreeGardenDataSample[],
    configuration:TreeGardenConfiguration)=>number,

  numberOfTrees:number,
  getAttributesForTree: (algorithmConfiguration:TreeGardenConfiguration, _dataSet:TreeGardenDataSample[])=>string[]
  numberOfBootstrappedSamples:number
  calculateOutOfTheBagError: boolean
  majorityVoting: (treeRoots:TreeGardenNode[],
    dataSample:TreeGardenDataSample,
    config:TreeGardenConfiguration)=> SingleSamplePredictionResult
  mergeClassificationResults:(values:string[])=>string,
  mergeRegressionResults: (values:number[])=>number
  buildTime?:number
};
export type PartialAlgorithmConfiguration =
  Partial<Omit<TreeGardenConfiguration, 'attributes'> & { attributes?: { [key:string]:Partial<typeof defaultAttributeConfiguration> } }>;
export const buildAlgorithmConfiguration = (dataSet:TreeGardenDataSample[], configuration: PartialAlgorithmConfiguration = {}) => {
  if (configuration.buildTime) {
    throw new Error(`This configuration was already build! ${JSON.stringify(configuration)}`);
  }

  if (!dataSet) {
    throw new Error('Data set that will be used for learning is required in "buildAlgorithmConfiguration" function call.');
  }
  const mergedConfiguration = { ...defaultConfiguration, ...(configuration || {}) } as TreeGardenConfiguration;
  if (!mergedConfiguration.allClasses) {
    mergedConfiguration.allClasses = mergedConfiguration.treeType === 'classification' ? getClassesOfDataSet(dataSet) : [];
  }
  mergedConfiguration.attributes = buildAttributesConfiguration(mergedConfiguration, dataSet);
  mergedConfiguration.buildTime = Date.now();
  return mergedConfiguration;
};

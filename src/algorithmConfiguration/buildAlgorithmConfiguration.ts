/* eslint-disable import/no-cycle */
import { defaultConfiguration } from './algorithmDefaultConfiguration';
import { buildAttributesConfiguration } from './buildAttributesConfiguration';
import { TreeGardenDataSample, getClassesOfDataSet } from '../dataSet/set';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
import { TreeGardenNode } from '../treeNode';
import { SplitCriteriaDefinition, SplitCriteriaFn } from '../split';
import { SingleSamplePredictionResult } from '../predict';

// We cannot infer this from defaultConfiguration because of cyclic dependency in types of defaultConfiguration

/**
 * TreeGardenConfiguration is somehow central object of tree-garden it holds every options regarding growing trees,
 * growing forests and their usage on unknown data. It can also be used for dependency injection of custom implementations.
 *
 * You do not want to write your configuration by hand, see {@link buildAlgorithmConfiguration}.
 */
export type TreeGardenConfiguration = {
  /**
   * tree-garden supports also regression trees and forests, here you can switch ;)
   * @defaultValue `classification`
   */
  treeType:'classification' | 'regression',

  /**
   * Key is attribute id, value is attribute meta object. Filled by **buildAlgorithmConfiguration**
   */
  attributes:{ [key:string]:typeof defaultAttributeConfiguration },

  /**
   * Only these attributes are considered for building decision tree
   */
  includedAttributes: string[],

  /**
   * These attributes are not considered for building decision tree
   */
  excludedAttributes: string[],

  /**
   * Impurity scoring function. You can switch on {@link impurity.getGiniIndexForSplit | gini},
   * {@link impurity.getInformationGainForSplit | informationGain}
   * or {@link impurity.getScoreForRegressionTreeSplit | regression tree score} in case of regression trees.
   * You can also implement your own. @defaultValue {@link impurity.getInformationGainRatioForSplit}
   */
  getScoreForSplit:(
    parentDataSet:TreeGardenDataSample[],
    childDataSets:{ [key:string]:TreeGardenDataSample[] },
    config:TreeGardenConfiguration,
    splitter:SplitCriteriaFn
  )=>number,

  /**
   * Depends on split scoring function you choose, entropy based methods have higher score, better split, but
   * gini index has lower score better split! @defaultValue `true`
   */
  biggerScoreBetterSplit:boolean,

  /**
   * You can configure [pre-pruning](/importantBasics/#pre-pruning).
   */
  shouldWeStopGrowth:(node:TreeGardenNode, configuration:TreeGardenConfiguration)=>boolean,

  /**
   * How many of considered splits in each node should be stored, it can be seen in
   * [tree-garden-visualization](https://github.com/miob-miob/treeGardenVisualization)
   * upon clicking on node. @defaultValue `3`
   */
  numberOfSplitsKept: number,

  /**
   * How to deal with missing values during growth phase, it can be also set individually for each attribute.
   * @defaultValue {@link dataSet.getMostCommonValueFF}
   */
  growMissingValueReplacement:(dataSet:TreeGardenDataSample[], attributeId:string, configuration:TreeGardenConfiguration)=>(sample:TreeGardenDataSample)=>any,
  /**
   * How to deal with missing values during evaluate phase, it can be also set individually for each attribute.
   * @defaultValue {@link dataSet.getMostCommonValueFF}
   */
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

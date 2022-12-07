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
 *
 * `growMissingValueReplacement`,`evaluateMissingValueReplacement`, `missingValue`,`getAllPossibleSplitCriteriaForDiscreteAttribute`
 * and `getAllPossibleSplitCriteriaForContinuousAttribute` can be defined differently for particular attribute.
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
   * {@link impurity.getInformationGainForSplit | information gain}
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
   * How to deal with missing values during growth phase.
   * @defaultValue {@link dataSet.getMostCommonValueFF}
   */
  growMissingValueReplacement:(dataSet:TreeGardenDataSample[], attributeId:string, configuration:TreeGardenConfiguration)=>(sample:TreeGardenDataSample)=>any,
  /**
   * How to deal with missing values during evaluate phase.
   * @defaultValue {@link dataSet.getMostCommonValueFF}
   */
  evaluateMissingValueReplacement:(dataSet:TreeGardenDataSample[], attributeId:string, configuration:TreeGardenConfiguration)=>(sample:TreeGardenDataSample)=>any,

  /**
   * If there is missing value while classifying (reference data set for replacement was not provided) this function will
   * gather tag for given node. See {@link dataSet.getMostCommonTagOfSamplesInNode | default implementation}.
   */
  getTagOfSampleWithMissingValueWhileClassifying?:(sample:TreeGardenDataSample, attributeId:string, nodeWhereWeeNeedValue:TreeGardenNode, config:TreeGardenConfiguration)=>any

  /**
   * Function that will retrieve class from node of classification tree  for given sample  @defaultValue {@link predict.getMostCommonClassForNode }
   */
  getClassFromLeafNode:(node:TreeGardenNode, sample?:TreeGardenDataSample)=>string,

  /**
   * Function that will retrieve value from node of regression tree  for given sample  @defaultValue {@link predict.getValueForNode }
   */
  getValueFromLeafNode:(node:TreeGardenNode, sample?:TreeGardenDataSample)=>number,

  /**
   * If true only binary splits are allowed - this is restriction implemented in CART algorithm - possible splits are designed in way
   * that it has always boolean outcome - two child nodes leads from each parent @defaultValue `false`
   *
   * if `true` it will perform very slowly on data sets with attributes
   *  like date, name - plenty of possible discrete values.
   */
  onlyBinarySplits:boolean,

  /**
   * What value is considered as missing value @defaultValue `undefined`
   */
  missingValue:any,

  /**
   * If true all data partitions in each node are kept - data of tree will be huge suitable just for small training sets
   * @defaultValue `false`
   */
  keepFullLearningData:boolean,

  /**
   * Strategy, how to generate all possible splits for given discrete attribute @defaultValue {@link split.getPossibleSpitCriteriaForDiscreteAttribute}
   */
  getAllPossibleSplitCriteriaForDiscreteAttribute:(attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:TreeGardenConfiguration)=>SplitCriteriaDefinition[],

  /**
   * Strategy, how to generate all possible splits for given continuous attribute @defaultValue {@link split.getPossibleSpitCriteriaForContinuousAttribute}
   */
  getAllPossibleSplitCriteriaForContinuousAttribute:(attributeId:string,
    dataSet:TreeGardenDataSample[],
    configuration:TreeGardenConfiguration)=>SplitCriteriaDefinition[],

  /**
   * If you use cost complexity pruning **alpha** parameter is internally found by cross-validation, you can change
   * how many datasets are used. @defaultValue `5`
   */
  costComplexityPruningKFold:number,

  /**
   * Function used for scoring of reduced error pruning @defaultValue {@link prune.getPrunedTreeScore}
   */
  reducedErrorPruningGetScore:(accuracyBeforePruning:number, accuracyAfterPruning:number, numberOfNodesInPrunedTree:number)=>number,

  /**
   * All classes of training data set - filled by {@link buildAlgorithmConfiguration}
   */
  allClasses?:string[],

  /**
   * Function that will calculate how precise tree is  @defaultValue {@link getTreeAccuracy}
   */
  getTreeAccuracy:(
    treeRootNode:TreeGardenNode,
    dataSet:TreeGardenDataSample[],
    configuration:TreeGardenConfiguration)=>number,

  /**
   * How many trees do we want in random forest - @defaultValue `27`
   */
  numberOfTrees:number,

  /**
   * Function for gathering subset of attributes for random forest @defaultValue {@link configuration.getSubsetOfAttributesForTreeOfRandomForest}
   */
  getAttributesForTree: (algorithmConfiguration:TreeGardenConfiguration, _dataSet:TreeGardenDataSample[])=>string[]

  /**
   * How many samples are bootstrapped for each tree of random forest, @defaultValue `0` which means
   * same amount as number of samples in training data set
   */
  numberOfBootstrappedSamples:number

  /**
   * Should we calculate [out of the bag error](https://en.wikipedia.org/wiki/Out-of-bag_error) for random forest? @defaultValue `true`
   */
  calculateOutOfTheBagError: boolean

  /**
   * Majority voting function for random forests, @defaultValue {@link predict.getResultFromMultipleTrees}
   */
  majorityVoting: (treeRoots:TreeGardenNode[],
    dataSample:TreeGardenDataSample,
    config:TreeGardenConfiguration)=> SingleSamplePredictionResult

  /**
   * Function for merging classification results (from multiple trees) @defaultValue {@link statistics.getMostCommonValue}
   */
  mergeClassificationResults:(values:string[])=>string,
  /**
   * Function for merging regression results (from multiple trees) @defaultValue {@link statistics.getMedian}
   */
  mergeRegressionResults: (values:number[])=>number

  /**
   * Timestamp - when buildAlgorithmConfig was called - filled automatically
   */
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

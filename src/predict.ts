/* eslint-disable no-underscore-dangle,import/no-cycle */
import { TreeGardenDataSample } from './dataSet/set';
import { TreeGardenConfiguration } from './algorithmConfiguration';
import { TreeGardenNode } from './treeNode';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { getSplitCriteriaFn } from './split';


type NodeOrIdArray<T extends boolean> = T extends true?string[]:TreeGardenNode;
/**
 * Retrieve leaf node of tree for given sample.
 */
export const getLeafNodeOfSample = <T extends boolean>(
  sample:TreeGardenDataSample,
  rootNode:TreeGardenNode,
  algorithmConfiguration:TreeGardenConfiguration,
  retrieveIds?:T
):NodeOrIdArray<T> => {
  const visitedNodeIds = [rootNode.id];
  const getTagOfSampleWithMissingValue = algorithmConfiguration.getTagOfSampleWithMissingValueWhileClassifying;
  let currentNode = rootNode;
  while (!currentNode.isLeaf) {
    const attributeId = currentNode.chosenSplitCriteria![0];
    const sampleValueForGivenAttribute = sample[attributeId];
    const { missingValue } = algorithmConfiguration.attributes[attributeId];
    if (sampleValueForGivenAttribute === missingValue && !getTagOfSampleWithMissingValue) {
      throw new Error(`When classifying sample with label: '${sample._label}', its value: '${sample[attributeId]}' for attribute '${attributeId}' is considered 
      as missing, it should be replaced using 'referenceDataSetForReplacing', or you should define 'replaceMissingValuesWhileEvaluating'
       function in configuration!`);
    }
    const tagOfSample = (sampleValueForGivenAttribute === missingValue)
      ? getTagOfSampleWithMissingValue!(sample, attributeId, currentNode, algorithmConfiguration) : getSplitCriteriaFn(...currentNode.chosenSplitCriteria!)(sample);

    if (!currentNode.childNodes![tagOfSample]) {
      // this can happen if value was only in validation dataset
      // or if ended up in this node, but we do not have training data in given node
      // lets return this one even if it is not leaf
      // example: we have 3 sizes of apartmans - small medium and large, but all training samples reached this nodes were only 'small'
      // but validation data here has 'medium'
      return currentNode as NodeOrIdArray<T>;
    }
    currentNode = currentNode.childNodes![tagOfSample];
    visitedNodeIds.push(currentNode.id);
  }
  if (retrieveIds) {
    return visitedNodeIds as NodeOrIdArray<T>;
  }
  return currentNode as NodeOrIdArray<T>;
};

/**
 *  Missing value replacement before prediction. If you provided `getTagOfSampleWithMissingValueWhileClassifying`
 *  to algorithmConfiguration (configured by default) replacing is delayed to point where value is really needed.
 *  @param referenceDataSetForReplacing  data set from which values for replacing are calculated
 */
export const getReadyToPredictSamples = (
  samplesToPredictWithMissingValues:TreeGardenDataSample[],
  algorithmConfiguration:TreeGardenConfiguration,
  referenceDataSetForReplacing?:TreeGardenDataSample[],
  fnName = 'getTreePrediction'
) => {
  if (referenceDataSetForReplacing !== undefined && algorithmConfiguration.getTagOfSampleWithMissingValueWhileClassifying !== undefined) {
    console.warn(`When calling '${fnName}', You provided referenceDataSetForReplacing to replace missing values,
     but also 'getTagOfSampleWithMissingValueWhileClassifying' is defined in algorithmConfiguration:TreeGardenConfiguration (default configuration) 
     - provided referenceDataSetForReplacing, will be used for missing values replacement - 'getTagOfSampleWithMissingValueWhileClassifying' config will be ignored.
     To get rid of this warning, set 'configuration.getTagOfSampleWithMissingValueWhileClassifying = undefined'.`);
  }
  const readyToGoSamples = referenceDataSetForReplacing !== undefined ? getDataSetWithReplacedValues({
    replacerFactoryKey: 'evaluateMissingValueReplacement',
    samplesToReplace: samplesToPredictWithMissingValues as TreeGardenDataSample[],
    algorithmConfiguration,
    referenceDataSet: referenceDataSetForReplacing
  }) : [...samplesToPredictWithMissingValues];
  return readyToGoSamples;
};

/**
 * Get leaf nodes of tree for multiple unknown samples.
 */
export const getLeafNodesForSamples = (
  samplesToClassify:TreeGardenDataSample[],
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:TreeGardenConfiguration,
  referenceDataSetForReplacing?:TreeGardenDataSample[]
) => {
  const readyToClassifySamples = getReadyToPredictSamples(samplesToClassify, algorithmConfiguration, referenceDataSetForReplacing);
  return readyToClassifySamples
    .map((sample) => [sample, getLeafNodeOfSample(sample, decisionTreeRoot, algorithmConfiguration, false)] as [TreeGardenDataSample, TreeGardenNode]);
};

/**
 * Extract class from node and given sample for **classification** tree
 */
export const getMostCommonClassForNode = (leafNode:TreeGardenNode, _sample?:TreeGardenDataSample) => {
  const sortedClasses = Object.entries(leafNode.classCounts)
    .sort(([classOne, countOne], [classTwo, countTwo]) => {
      if (countOne === countTwo) {
        if (classOne < classTwo) {
          return -1;
        }
        if (classOne === classTwo) {
          return 0;
        }
        return 1;
      }
      return countTwo - countOne;
    });

  return sortedClasses[0][0];
};

/**
 * Extract value from node and given sample for **regression** tree
 */
export const getValueForNode = (leafNode:TreeGardenNode, _sample?:TreeGardenDataSample) => leafNode.regressionTreeAverageOutcome as number;

export type SingleSamplePredictionResult = ReturnType<TreeGardenConfiguration['getValueFromLeafNode']> | ReturnType<TreeGardenConfiguration['getClassFromLeafNode']>;
export type MultipleSamplesPredictionResult = [TreeGardenDataSample, SingleSamplePredictionResult][];
type PredictionReturnValue<T> = T extends TreeGardenDataSample[]?MultipleSamplesPredictionResult:SingleSamplePredictionResult;

/**
 * Get outcome of your trained decision tree on unknown samples. See **examples** to see it in action.
 * @param referenceDataSetForReplacing Provide data set to replace missing values in your unknown samples you want to classify.
 */
export const getTreePrediction = <T extends TreeGardenDataSample | TreeGardenDataSample[] >(
  samplesToPredict:T,
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:TreeGardenConfiguration,
  referenceDataSetForReplacing?:TreeGardenDataSample[]
) => {
  const multipleSamples = Boolean(samplesToPredict.length !== undefined);
  const samplesToPredictAsArray = (multipleSamples ? samplesToPredict : [samplesToPredict]) as TreeGardenDataSample[];
  const extractFromNode = algorithmConfiguration.treeType === 'classification' ? algorithmConfiguration.getClassFromLeafNode : algorithmConfiguration.getValueFromLeafNode;
  const predictions:MultipleSamplesPredictionResult = getLeafNodesForSamples(samplesToPredictAsArray, decisionTreeRoot, algorithmConfiguration, referenceDataSetForReplacing)
    .map(([sample, leafNode]) => [sample, extractFromNode(leafNode, sample)]);
  if (multipleSamples) {
    return predictions as PredictionReturnValue<T>;
  }
  return predictions[0][1] as PredictionReturnValue<T>;
};

/**
 * Get outcome of your trained random  forest on unknown samples. See [random forest example](../../examples/randomForest) to see it in action.
 * @param referenceDataSetForReplacing Provide data set to replace missing values in your unknown samples you want to classify.
 */
export const getRandomForestPrediction = <T extends TreeGardenDataSample|TreeGardenDataSample[]> (
  samplesToPredict:T,
  trees:TreeGardenNode[],
  algorithmConfiguration: TreeGardenConfiguration,
  referenceDataSetForReplacing?:TreeGardenDataSample[]
) => {
  const multipleSamples = Boolean(samplesToPredict.length !== undefined);
  const samplesPriorReplacement = (multipleSamples ? samplesToPredict : [samplesToPredict]) as TreeGardenDataSample[];
  const readyToGoSamples = getReadyToPredictSamples(samplesPriorReplacement, algorithmConfiguration, referenceDataSetForReplacing, 'getRandomForestPrediction');

  const samplesAndPrediction: MultipleSamplesPredictionResult = readyToGoSamples
    .map((sample) => [sample, algorithmConfiguration.majorityVoting(trees, sample, algorithmConfiguration)]);

  if (multipleSamples) {
    return samplesAndPrediction as PredictionReturnValue<T>;
  }
  return samplesAndPrediction[0][1] as PredictionReturnValue<T>;
};

/**
 * Strategy how to obtain results from multiple trees of random forest for given sample.
 */
export const getResultFromMultipleTrees = (
  treeRoots:TreeGardenNode[],
  dataSample:TreeGardenDataSample,
  config:TreeGardenConfiguration
) => {
  const valueFromNodeFn = config.treeType === 'classification' ? config.getClassFromLeafNode : config.getValueFromLeafNode;
  const values = treeRoots.map((tree) => {
    const hitNode = getLeafNodeOfSample(dataSample, tree, config, false);
    return valueFromNodeFn(hitNode, dataSample);
  });
  if (config.treeType === 'classification') {
    return config.mergeClassificationResults(values as string[]);
  }
  return config.mergeRegressionResults(values as number[]);
};


/* eslint-disable no-underscore-dangle,import/no-cycle */
import { TreeGardenDataSample } from './dataSet/set';
import { AlgorithmConfiguration } from './algorithmConfiguration';
import { TreeGardenNode } from './treeNode';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { getSplitCriteriaFn } from './dataSet/split';


type NodeOrIdArray<T extends boolean> = T extends true?string[]:TreeGardenNode;
export const getLeafNodeOfSample = <T extends boolean>(
  sample:TreeGardenDataSample,
  rootNode:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
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
      // @ts-expect-error
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

export const getLeafNodesForSamples = (
  samplesToClassify:TreeGardenDataSample[],
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
  referenceDataSetForReplacing?:TreeGardenDataSample[]
) => {
  const readyToClassifySamples = (referenceDataSetForReplacing && !algorithmConfiguration.getTagOfSampleWithMissingValueWhileClassifying) ? getDataSetWithReplacedValues({
    replacerFactoryKey: 'evaluateMissingValueReplacement',
    samplesToReplace: samplesToClassify as TreeGardenDataSample[],
    algorithmConfiguration,
    referenceDataSet: referenceDataSetForReplacing
  }) : [...samplesToClassify];

  return readyToClassifySamples
    .map((sample) => [sample, getLeafNodeOfSample(sample, decisionTreeRoot, algorithmConfiguration, false)] as [TreeGardenDataSample, TreeGardenNode]);
};

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

export const getValueForNode = (leafNode:TreeGardenNode, _sample?:TreeGardenDataSample) => leafNode.regressionTreeAverageOutcome as number;

export type SingleSamplePredictionResult = ReturnType<AlgorithmConfiguration['getValueFromLeafNode']> | ReturnType<AlgorithmConfiguration['getClassFromLeafNode']>;
export type MultipleSamplesPredictionResult = [TreeGardenDataSample, SingleSamplePredictionResult][];
type PredictionReturnValue<T> = T extends TreeGardenDataSample[]?MultipleSamplesPredictionResult:SingleSamplePredictionResult;

export const getTreePrediction = <T extends TreeGardenDataSample | TreeGardenDataSample[] >(
  samplesToPredict:T,
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
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


export const getRandomForestPrediction = <T extends TreeGardenDataSample|TreeGardenDataSample[]> (
  samplesToPredict:T,
  trees:TreeGardenNode[],
  algorithmConfiguration: AlgorithmConfiguration,
  referenceDataSetForReplacing?:TreeGardenDataSample[]
) => {
  const multipleSamples = Boolean(samplesToPredict.length !== undefined);
  const samplesPriorReplacement = (multipleSamples ? samplesToPredict : [samplesToPredict]) as TreeGardenDataSample[];
  const readyToGoSamples = (referenceDataSetForReplacing && !algorithmConfiguration.getTagOfSampleWithMissingValueWhileClassifying) ? getDataSetWithReplacedValues({
    replacerFactoryKey: 'evaluateMissingValueReplacement',
    samplesToReplace: samplesPriorReplacement as TreeGardenDataSample[],
    algorithmConfiguration,
    referenceDataSet: referenceDataSetForReplacing
  }) : [...samplesPriorReplacement];

  const samplesAndPrediction: MultipleSamplesPredictionResult = readyToGoSamples
    .map((sample) => [sample, algorithmConfiguration.majorityVoting(trees, sample, algorithmConfiguration)]);

  if (multipleSamples) {
    return samplesAndPrediction as PredictionReturnValue<T>;
  }
  return samplesAndPrediction[0][1] as PredictionReturnValue<T>;
};

// todo tests
export const getResultFromMultipleTrees = (
  treeRoots:TreeGardenNode[],
  dataSample:TreeGardenDataSample,
  config:AlgorithmConfiguration
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
// todo think about exports

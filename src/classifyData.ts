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
    .map((sample) => [sample, getLeafNodeOfSample(sample, decisionTreeRoot, algorithmConfiguration, false)] as const);
};

// todo implement similar function for regression trees
export const getPredictedClassesOfSamples = (
  samplesToClassify:TreeGardenDataSample[],
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
  referenceDataSetForReplacing?:TreeGardenDataSample[]
) => getLeafNodesForSamples(samplesToClassify, decisionTreeRoot, algorithmConfiguration, referenceDataSetForReplacing)
  .map(([sample, leafNode]) => [sample, algorithmConfiguration.getClassFromLeafNode(leafNode, sample)] as const);

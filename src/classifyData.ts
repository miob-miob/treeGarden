/* eslint-disable no-underscore-dangle,import/no-cycle */
import { DataSetSample } from './dataSet/set';
import { AlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { TreeGardenNode } from './treeNode';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { getSplitCriteriaFn } from './dataSet/split';


const getLeafNodeOfSample = (sample:DataSetSample, rootNode:TreeGardenNode, algorithmConfiguration:AlgorithmConfiguration) => {
  const replaceAsEvaluating = algorithmConfiguration.replaceMissingValuesWhileEvaluating;
  let currentNode = rootNode;
  while (!currentNode.isLeaf) {
    const attributeId = currentNode.chosenSplitCriteria![0];
    const sampleValueForGivenAttribute = sample[attributeId];
    const { missingValue } = algorithmConfiguration.attributes[attributeId];
    if (sampleValueForGivenAttribute === missingValue && !replaceAsEvaluating) {
      throw new Error(`When classifying sample with label: '${sample._label}', its value: '${sample[attributeId]}' is considered 
      as missing, it should be replaced using 'referenceDataSetForReplacing', or you should define 'replaceMissingValuesWhileEvaluating'
       function in configuration!`);
    }
    const replacedValueForAttributeId = (sampleValueForGivenAttribute === missingValue)
      ? replaceAsEvaluating!(sample, attributeId, currentNode) : sampleValueForGivenAttribute;
    // we do not want modify smample in case replace missing  value
    const sampleCopy = { ...sample, [attributeId]: replacedValueForAttributeId };
    // @ts-expect-error
    const tagOfSample = getSplitCriteriaFn(...currentNode.chosenSplitCriteria!)(sampleCopy);
    if (!currentNode.childNodes![tagOfSample]) {
      // this can happen if value was only in validation dataset
      // or if ended up in this node, but we do not have training data in given node
      // lets return this one even if it is not leaf
      // example: we have 3 sizes of apartmans - small medium and large, but all training samples reached this nodes were only 'small'
      // but validation data here has 'medium'
      return currentNode;
    }
    currentNode = currentNode.childNodes![tagOfSample];
  }
  return currentNode;
};


export const getLeafNodesForSamples = (
  samplesToClassify:DataSetSample[],
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
  referenceDataSetForReplacing?:DataSetSample[]
) => {
  const readyToClassifySamples = (referenceDataSetForReplacing && !algorithmConfiguration.replaceMissingValuesWhileEvaluating) ? getDataSetWithReplacedValues({
    replacerFactoryKey: 'evaluateMissingValueReplacement',
    samplesToReplace: samplesToClassify as DataSetSample[],
    algorithmConfiguration,
    referenceDataSet: referenceDataSetForReplacing
  }) : [...samplesToClassify];

  return readyToClassifySamples
    .map((sample) => [sample, getLeafNodeOfSample(sample, decisionTreeRoot, algorithmConfiguration)] as const);
};


export const getPredictedClassesOfSamples = (
  samplesToClassify:DataSetSample[],
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
  referenceDataSetForReplacing?:DataSetSample[]
) => getLeafNodesForSamples(samplesToClassify, decisionTreeRoot, algorithmConfiguration, referenceDataSetForReplacing)
  .map(([sample, leafNode]) => [sample, algorithmConfiguration.getClassFromLeafNode(leafNode, sample)] as const);

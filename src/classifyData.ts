/* eslint-disable no-underscore-dangle */
import { DataSetSample } from './dataSet/set';
import { AlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { TreeGardenNode } from './treeNode';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';


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
    const valueForAttributeId = (sampleValueForGivenAttribute === missingValue) ? replaceAsEvaluating!(sample, attributeId, currentNode) : sampleValueForGivenAttribute;
    if (!currentNode.childNodes![valueForAttributeId]) {
      throw new Error(`There is no children node under
       value '${valueForAttributeId}' of node ${JSON.stringify(currentNode)}! Maybe there was not such value in training set!`);
    }
    currentNode = currentNode.childNodes![valueForAttributeId];
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

  return readyToClassifySamples.map((sample) => [sample, getLeafNodeOfSample(sample, decisionTreeRoot, algorithmConfiguration)] as const);
};


export const getPredictedClassesOfSamples = (
  samplesToClassify:DataSetSample[],
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
  referenceDataSetForReplacing?:DataSetSample[]
) => getLeafNodesForSamples(samplesToClassify, decisionTreeRoot, algorithmConfiguration, referenceDataSetForReplacing)
  .map(([sample, leafNode]) => [sample, algorithmConfiguration.getClassFromLeafNode(leafNode, sample)] as const);

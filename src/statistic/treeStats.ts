/* eslint-disable no-underscore-dangle,import/no-cycle */

import { getFlattenTree, TreeGardenNode } from '../treeNode';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from '../dataSet/set';
import { getLeafNodeOfSample, getPredictedClassesOfSamples } from '../classifyData';
import { AlgorithmConfiguration } from '../algorithmConfiguration';
import { getArithmeticAverage } from './basicStatistic';

// used for regression trees
// https://en.wikipedia.org/wiki/Coefficient_of_determination#Definitions
// use absolute value instead of pow as it is better for reduced error pruning
export const getRAbsError = (
  treeRootNode:TreeGardenNode,
  dataSet:TreeGardenDataSample[],
  configuration:AlgorithmConfiguration
) => {
  const values = dataSet.map((sample) => sample._class as number);
  const averageValue = getArithmeticAverage(values);
  let sumOFSquaresOfResiduals = 0; // SSres
  let sumOfSquaresFromAverage = 0; // SStot

  dataSet.forEach((sample) => {
    const hitNode = getLeafNodeOfSample(sample, treeRootNode, configuration, false);
    sumOFSquaresOfResiduals += Math.abs(sample._class as number - hitNode.regressionTreeAverageOutcome!);
    sumOfSquaresFromAverage += Math.abs(sample._class as number - averageValue);
  });

  return 1 - (sumOFSquaresOfResiduals / sumOfSquaresFromAverage);
};


// for classification trees
export const getMissClassificationRate = (
  treeRootNode:TreeGardenNode,
  dataSet:TreeGardenDataSample[],
  configuration:AlgorithmConfiguration
) => {
  const samplesAndClasses = getPredictedClassesOfSamples(dataSet, treeRootNode, configuration);
  return samplesAndClasses.filter(([sample, predictedClass]) => predictedClass === sample._class).length / samplesAndClasses.length;
};
// todo put it to configuration  as well? (used by cost complexity pruning)
export const getTreeAccuracy = (
  treeRootNode:TreeGardenNode,
  dataSet:TreeGardenDataSample[],
  configuration:AlgorithmConfiguration
) => {
  consistentDataSetGuard(dataSet, 'getTreeAccuracy');
  continuousAttributesGuard(configuration, dataSet, 'getTreeAccuracy');
  if (configuration.treeType === 'classification') {
    return getMissClassificationRate(treeRootNode, dataSet, configuration);
  }
  return getRAbsError(treeRootNode, dataSet, configuration);
};


export const getNumberOfTreeNodes = (treeRoot: TreeGardenNode) => getFlattenTree(treeRoot).length;
export const getNumberOfSamplesInNode = (node: TreeGardenNode) => Object.values(node.classCounts)
  .reduce((acc, current) => acc + current, 0);



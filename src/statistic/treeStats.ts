/* eslint-disable no-underscore-dangle,import/no-cycle */

import { getFlattenTree, TreeGardenNode } from '../treeNode';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from '../dataSet/set';
import { getLeafNodeOfSample, getPredictedClassesOfSamples } from '../classifyData';
import { AlgorithmConfiguration } from '../algorithmConfiguration';
import { getArithmeticAverage } from './medianAndAverage';


// https://en.wikipedia.org/wiki/Coefficient_of_determination#Definitions
// use absolute value instead of pow as it is better for reduced error pruning
// todo test
export const getRAbsError = (
  treeRootNode:TreeGardenNode,
  validationSet:TreeGardenDataSample[],
  configuration:AlgorithmConfiguration
) => {
  const values = validationSet.map((sample) => sample._class as number);
  const averageValue = getArithmeticAverage(values);
  let sumOFSquaresOfResiduals = 0; // SSres
  let sumOfSquaresFromAverage = 0; // SStot

  validationSet.forEach((sample) => {
    const hitNode = getLeafNodeOfSample(sample, treeRootNode, configuration, false);
    // eslint-disable-next-line no-restricted-properties
    sumOFSquaresOfResiduals += Math.abs(sample._class as number - hitNode.regressionTreeAverageOutcome!);
    // eslint-disable-next-line no-restricted-properties
    sumOfSquaresFromAverage += Math.abs(sample._class as number - averageValue);
  });

  return 1 - (sumOFSquaresOfResiduals / sumOfSquaresFromAverage);
};

export const getTreeAccuracy = (
  treeRootNode:TreeGardenNode,
  validationSet:TreeGardenDataSample[],
  configuration:AlgorithmConfiguration
) => {
  consistentDataSetGuard(validationSet, 'getMisclassificationRate');
  continuousAttributesGuard(configuration, validationSet, 'getTreeAccuracy');
  if (configuration.treeType === 'classification') {
    // validation is also used for replacing itself
    const samplesAndClasses = getPredictedClassesOfSamples(validationSet, treeRootNode, configuration, validationSet);
    return samplesAndClasses.filter(([sample, predictedClass]) => sample._class === predictedClass).length / samplesAndClasses.length;
  }

  // return 1 / (validationSet.reduce((error, currentSample) => {
  //   const hitNode = getLeafNodeOfSample(currentSample, treeRootNode, configuration, false);
  //   return Math.abs(currentSample._class as number - hitNode.regressionTreeAverageOutcome!) + error;
  // }, 0) / validationSet.length);
  return getRAbsError(treeRootNode, validationSet, configuration);
};


export const getNumberOfTreeNodes = (treeRoot: TreeGardenNode) => getFlattenTree(treeRoot).length;
export const getNumberOfSamplesInNode = (node: TreeGardenNode) => Object.values(node.classCounts)
  .reduce((acc, current) => acc + current, 0);


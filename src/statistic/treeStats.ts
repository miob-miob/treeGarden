/* eslint-disable no-underscore-dangle,import/no-cycle */

import { getFlattenTree, TreeGardenNode } from '../treeNode';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from '../dataSet/set';
import { getLeafNodeOfSample, getTreePrediction } from '../predict';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getArithmeticAverage } from './basicStatistic';


// todo lot of space for optimization
// used in calculation of oob error
export const getRAbsErrorRaw = (realValues:number[], predictedValues:number[]) => {
  if (realValues.length !== predictedValues.length) {
    throw new Error('Must be equal length as corresponds to real sample values and predicted ones !');
  }
  const averageValue = getArithmeticAverage(realValues);
  let sumOFSquaresOfResiduals = 0; // SSres
  let sumOfSquaresFromAverage = 0; // SStot

  realValues.forEach((realValue, index) => {
    const predictedValue = predictedValues[index];
    sumOFSquaresOfResiduals += Math.abs(realValue as number - predictedValue);
    sumOfSquaresFromAverage += Math.abs(realValue - averageValue);
  });

  return 1 - (sumOFSquaresOfResiduals / sumOfSquaresFromAverage);
};


// used for regression trees
// https://en.wikipedia.org/wiki/Coefficient_of_determination#Definitions
// use absolute value instead of pow as it is better for reduced error pruning
export const getRAbsError = (
  treeRootNode:TreeGardenNode,
  dataSet:TreeGardenDataSample[],
  configuration:TreeGardenConfiguration
) => {
  // todo we can skip one iteration here
  const values = dataSet.map((sample) => sample._class as number);
  const predictedValues = dataSet.map((sample) => {
    const hitNode = getLeafNodeOfSample(sample, treeRootNode, configuration, false);
    return configuration.getValueFromLeafNode(hitNode, sample);
  });
  return getRAbsErrorRaw(values, predictedValues);
};

type ClassOfSample = TreeGardenDataSample['_class'];

// used in calculation of oob error
export const getMissClassificationRateRaw = (realClasses:ClassOfSample[], predictedClasses:ClassOfSample[]) => {
  // for (let index = 0; index < realClasses.length; index += 1) {
  //   console.log(realClasses[index], predictedClasses[index]);
  // }
  if (realClasses.length !== predictedClasses.length) {
    throw new Error('Must be equal length as corresponds to real sample classes and predicted ones !');
  }
  return realClasses.filter((realClass, index) => realClass === predictedClasses[index]).length / realClasses.length;
};

// for classification trees - but this should be accuracy - miss classification rate would be 1- accuracy
export const getMissClassificationRate = (
  treeRootNode:TreeGardenNode,
  dataSet:TreeGardenDataSample[],
  configuration:TreeGardenConfiguration
) => {
  const realClasses: ClassOfSample[] = [];
  const predictedClasses :ClassOfSample[] = [];
  getTreePrediction(dataSet, treeRootNode, configuration)
    .forEach(([sample, classOfSample]) => {
      realClasses.push(sample._class);
      predictedClasses.push(classOfSample);
    });

  return getMissClassificationRateRaw(realClasses, predictedClasses);
};

export const getTreeAccuracy = (
  treeRootNode:TreeGardenNode,
  dataSet:TreeGardenDataSample[],
  configuration:TreeGardenConfiguration
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

export const getTreeDepth = (tree:TreeGardenNode) => Math.max(...getFlattenTree(tree).map((node) => node.depth));

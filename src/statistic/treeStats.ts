/* eslint-disable no-underscore-dangle,import/no-cycle */

import { getFlattenTree, TreeGardenNode } from '../treeNode';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from '../dataSet/set';
import { getTreePrediction } from '../predict';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getArithmeticAverage } from './basicStatistic';


// todo lot of space for optimization
/**
 * Used for calculation of accuracy of **regression** trees, number up to `1`
 *
 * tree-garden implements modified [coefficient of determination](https://en.wikipedia.org/wiki/Coefficient_of_determination#Definitions),
 * it uses absolute values instead of squared values.
 * @remarks
 * **Do not be scared by negative values** - as number `0` means - model predicts as good as average value of your data set. It is
 * called comparison to base model. If model predicts worse, than average value, it will be **negative**. Ideal model will have `1`.
 */
export const getRAbsErrorRaw = (realValues:number[], predictedValues:number[]) => {
  if (realValues.length !== predictedValues.length) {
    throw new Error('Must be equal length as corresponds to real sample values and predicted ones !');
  }
  const averageValue = getArithmeticAverage(realValues);
  let sumOFAbsValuesOfResiduals = 0; // SSres
  let sumOfAbsValuesFromAverage = 0; // SStot

  realValues.forEach((realValue, index) => {
    const predictedValue = predictedValues[index];
    sumOFAbsValuesOfResiduals += Math.abs(realValue as number - predictedValue);
    sumOfAbsValuesFromAverage += Math.abs(realValue - averageValue);
  });

  return 1 - (sumOFAbsValuesOfResiduals / sumOfAbsValuesFromAverage);
};

/**
 * Wrapper for {@link getRAbsErrorRaw}
 */
export const getRAbsError = (
  treeRootNode:TreeGardenNode,
  dataSet:TreeGardenDataSample[],
  configuration:TreeGardenConfiguration
) => {
  const values = dataSet.map((sample) => sample._class as number);
  const predictedValues = getTreePrediction(dataSet, treeRootNode, configuration)
    .map(([_sample, value]) => value as number);
  return getRAbsErrorRaw(values, predictedValues);
};

type ClassOfSample = TreeGardenDataSample['_class'];

/**
 * Used for calculation of accuracy of **classification** trees, number between `0` and `1`
 *
 * - `0` - 0% of correct classifications
 * - `1` - 100% of correct classifications
 */
export const getMissClassificationRateRaw = (realClasses:ClassOfSample[], predictedClasses:ClassOfSample[]) => {
  // for (let index = 0; index < realClasses.length; index += 1) {
  //   console.log(realClasses[index], predictedClasses[index]);
  // }
  if (realClasses.length !== predictedClasses.length) {
    throw new Error('Must be equal length as corresponds to real sample classes and predicted ones !');
  }
  return realClasses.filter((realClass, index) => realClass === predictedClasses[index]).length / realClasses.length;
};

/**
 * Wrapper for {@link getMissClassificationRateRaw}
 */
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

/**
 * Calculate accuracy for tree (classification and regression) on given data set.
 *
 * See {@link getMissClassificationRateRaw} and {@link getRAbsErrorRaw} for more information
 */
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

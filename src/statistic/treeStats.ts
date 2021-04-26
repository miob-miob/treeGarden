/* eslint-disable no-underscore-dangle */

// todo use  https://gist.github.com/michhar/2dfd2de0d4f8727f873422c5d959fff5#file-titanic-csv for tests
import { TreeGardenNode } from '../treeNode';
import { consistentDataSetGuard, DataSetSample } from '../dataSet/set';
import { getPredictedClassesOfSamples } from '../classifyData';
import { AlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';

export const getTreeAccuracy = (
  treeRootNode:TreeGardenNode,
  validationSet:DataSetSample[],
  configuration:AlgorithmConfiguration
) => {
  consistentDataSetGuard(validationSet, 'getMisclassificationRate');
  // validation is also used for replacing itself
  const samplesAndClasses = getPredictedClassesOfSamples(validationSet, treeRootNode, configuration, validationSet);
  return samplesAndClasses.filter(([sample, predictedClass]) => sample._class === predictedClass).length / samplesAndClasses.length;
};



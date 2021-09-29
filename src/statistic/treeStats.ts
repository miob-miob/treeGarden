/* eslint-disable no-underscore-dangle,import/no-cycle */

// todo use  https://gist.github.com/michhar/2dfd2de0d4f8727f873422c5d959fff5#file-titanic-csv for tests
import { getFlattenTree, TreeGardenNode } from '../treeNode';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from '../dataSet/set';
import { getPredictedClassesOfSamples } from '../classifyData';
import { AlgorithmConfiguration } from '../algorithmConfiguration';

export const getTreeAccuracy = (
  treeRootNode:TreeGardenNode,
  validationSet:TreeGardenDataSample[],
  configuration:AlgorithmConfiguration
) => {
  consistentDataSetGuard(validationSet, 'getMisclassificationRate');
  continuousAttributesGuard(configuration, validationSet, 'getTreeAccuracy');
  // validation is also used for replacing itself
  const samplesAndClasses = getPredictedClassesOfSamples(validationSet, treeRootNode, configuration, validationSet);
  return samplesAndClasses.filter(([sample, predictedClass]) => sample._class === predictedClass).length / samplesAndClasses.length;
};


export const getNumberOfTreeNodes = (treeRoot: TreeGardenNode) => getFlattenTree(treeRoot).length;
export const getNumberOfSamplesInNode = (node: TreeGardenNode) => Object.values(node.classCounts)
  .reduce((acc, current) => acc + current, 0);

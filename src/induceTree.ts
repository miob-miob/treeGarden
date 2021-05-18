import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { dataSetToTreeNode } from './treeNode';
import { AlgorithmConfiguration } from './algorithmConfiguration';
import { consistentDataSetGuard, TreeGardenDataSample } from './dataSet/set';


export const induceTree = (fullConfiguration:AlgorithmConfiguration, dataSet:TreeGardenDataSample[]) => {
  if (!fullConfiguration.buildTime) {
    throw new Error('You cannot use just partial configuration in "induceTree" function, build it with "buildAlgorithmConfiguration"');
  }
  consistentDataSetGuard(dataSet, 'induceTree');
  const shouldWeStop = fullConfiguration.shouldWeStopGrowth;
  const readyToGoDataSet = getDataSetWithReplacedValues({ samplesToReplace: dataSet, algorithmConfiguration: fullConfiguration });
  const rootNode = dataSetToTreeNode(readyToGoDataSet, fullConfiguration);
  const stack = [rootNode];
  while (stack.length > 0) {
    const currentNode = stack.splice(0, 1)[0];
    if (shouldWeStop(currentNode, fullConfiguration)) {
      currentNode.isLeaf = true;
    } else {
      currentNode.childNodes = {};
      Object.entries(currentNode.dataPartitions ?? {})
        .forEach(([tag, subset]) => {
          const newNode = dataSetToTreeNode(subset, fullConfiguration, currentNode);
          currentNode.childNodes![tag] = newNode;
          stack.push(newNode);
        });
    }
    // clean up - do not keep full fragments of data set
    if (!fullConfiguration.keepFullLearningData) {
      currentNode.dataPartitions = undefined;
    }
  }
  return rootNode;
};



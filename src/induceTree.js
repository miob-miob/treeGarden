import { getDataSetWithReplacedValues } from './utils/dataSet/replaceMissingValues';
import { dataSetToTreeNode } from './utils/treeNode';


export const induceTree = (fullConfiguration, dataSet) => {
  if (!fullConfiguration.buildTime) {
    throw new Error('You cannot use just partial configuration in "induceTree" function, build it with "buildAlgorithmConfiguration"');
  }
  const shouldWeStop = fullConfiguration.shouldWeStopGrowth;
  const readyToGoDataSet = getDataSetWithReplacedValues(dataSet, fullConfiguration);
  const rootNode = dataSetToTreeNode(readyToGoDataSet, fullConfiguration, null);
  const stack = [rootNode];
  while (stack.length > 0) {
    const currentNode = stack.splice(0, 1)[0];
    if (shouldWeStop(currentNode, fullConfiguration)) {
      currentNode.isLeaf = true;
    } else {
      currentNode.childNodes = {};
      Object.entries(currentNode.dataPartitions)
        .forEach(([tag, subset]) => {
          const newNode = dataSetToTreeNode(subset, fullConfiguration, currentNode);
          currentNode.childNodes[tag] = newNode;
          stack.push(newNode);
        });
    }
    // clean up - do not keep full fragments of data set
    if (!fullConfiguration.keepFullLearningData) {
      currentNode.dataPartitions = null;
    }
  }
  return rootNode;
};




// grow tree from dataset wo any preprocessing/runtime checks
import { TreeGardenDataSample } from './dataSet/set';
import { TreeGardenConfiguration } from './algorithmConfiguration';
import { dataSetToTreeNode } from './treeNode';


// todo test
export const rawGrowTree = (dataSet:TreeGardenDataSample[], fullConfiguration:TreeGardenConfiguration) => {
  const shouldWeStop = fullConfiguration.shouldWeStopGrowth;
  const rootNode = dataSetToTreeNode(dataSet, fullConfiguration);
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

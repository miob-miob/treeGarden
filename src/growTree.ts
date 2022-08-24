import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { dataSetToTreeNode } from './treeNode';
import { AlgorithmConfiguration } from './algorithmConfiguration';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from './dataSet/set';


// induce tree from dataset wo any preprocessing/runtime checks
const rawInduceTree = (dataSet:TreeGardenDataSample[], fullConfiguration:AlgorithmConfiguration) => {
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

export const growTree = (fullConfiguration:AlgorithmConfiguration, dataSet:TreeGardenDataSample[]) => {
  if (!fullConfiguration.buildTime) {
    throw new Error('You cannot use just partial configuration in "induceTree" function, build it with "buildAlgorithmConfiguration"');
  }
  consistentDataSetGuard(dataSet, 'induceTree');

  continuousAttributesGuard(fullConfiguration, dataSet, 'induceTree');
  const readyToGoDataSet = getDataSetWithReplacedValues({ samplesToReplace: dataSet, algorithmConfiguration: fullConfiguration });
  return rawInduceTree(readyToGoDataSet, fullConfiguration);
};


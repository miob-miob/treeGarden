import { getDataSetWithReplacedValues } from './utils/dataSet/replaceMissingValues';
import { dataSetToTreeNode } from './utils/treeNode';


const induceTree = (fullConfiguration, dataSet) => {
  if (!fullConfiguration.buildTime) {
    throw new Error('You cannot use just partial configuration in "induceTree" function, build it with "buildAlgorithmConfiguration"');
  }
  const willWeGrowFurther = fullConfiguration.willTreeGrow;
  const readyToGoDataSet = getDataSetWithReplacedValues(dataSet, fullConfiguration);
  const rootNode = dataSetToTreeNode(readyToGoDataSet, fullConfiguration, null);
  const stack = [rootNode];
  while (stack.length > 0) {
    const parentNode = stack.splice(0, 1);
    if (willWeGrowFurther(parentNode, fullConfiguration)) {
      // todo push to stack
      // todo connect nodes (chidleren parent) - children also must be hash with output tag
      // todo calculate partition statistics and delete partitions from node (memory opptimization)
      // todo set leaf node
    } else {
      // todo stop grow
      // todo set type of node

    }
  }
};



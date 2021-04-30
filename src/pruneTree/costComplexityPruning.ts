import { getAllLeafNodes, getMostCommonClassFromNode, TreeGardenNode } from '../treeNode';

// in fact weighted missclasification rate of leaf nodes
export const getMissClassificationRateOfTree = (treeRoot:TreeGardenNode) => {
  const trainingSamplesCount = Object.values(treeRoot.classCounts)
    .reduce((acc, current) => acc + current, 0);

  const leafNodes = getAllLeafNodes(treeRoot);
  return leafNodes.reduce((acc, leafNode) => {
    const countInThisLeaf = Object.values(leafNode.classCounts).reduce((nNodes, current) => nNodes + current, 0);
    const mostCommonClass = getMostCommonClassFromNode(leafNode);
    const countOfMostCommonClass = leafNode.classCounts[mostCommonClass];
    const missClassificationProbability = 1 - countOfMostCommonClass / countInThisLeaf;

    // weight it copared to count of all samples
    return acc + missClassificationProbability * (countInThisLeaf / trainingSamplesCount);
  }, 0);
};



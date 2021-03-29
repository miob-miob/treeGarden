

const defaultTreeNode = {
  parentNode: undefined,
  childrenNodes: undefined, // {"value":treeNode, "anotherValue":treeNode}
  chosenSplitCriteria: undefined, // best scoring split criteria
  bestSplits: undefined, // splits and scores
  dataPartitions: undefined, // split outcome - {tag:[sample,sample,sample]}
  dataPartitionsCounts: undefined, // split outcome - just numbers {tag:number,tag:number}
  score: undefined // winning score
};

export const createTreeNode = (node = {}) => ({ ...defaultTreeNode, ...node });


export const getAlreadyUsedCriteria = (treeNode) => {
  const result = [];
  let currentNode = treeNode;
  while (currentNode) {
    result.push(currentNode.chosenSplitCriteria);
    currentNode = currentNode.parentNode;
  }
  return result;
};



const defaultTreeNode = {
  parentNode: undefined,
  childrenNodes: undefined,
  chosenSplitCriteria: undefined, // best scoring split criteria
  inputDataSet: undefined, // portion of data came to this node
  partitions: undefined, // split outcome,
  score: undefined // winning score
};

export const createTreeNode = (node) => ({ ...defaultTreeNode, ...node });

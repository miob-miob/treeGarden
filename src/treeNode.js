

const defaultTreeNode = {
  parentNode: undefined,
  childrenNodes: undefined,
  chosenSplitCriteria: undefined, // best scoring split criteria
  dataPartitions: undefined, // split outcome - {tag:[sample,sample,sample]}
  dataPartitionsCounts: undefined, // split outcome - just numbers {tag:number,tag:number}
  score: undefined // winning score
};

export const createTreeNode = (node) => ({ ...defaultTreeNode, ...node });

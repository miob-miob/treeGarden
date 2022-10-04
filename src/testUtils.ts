import { simpleTree } from './sampleTrainedTrees/simpleTree';
import { TreeGardenNode } from './treeNode';


export const getRightOnBlackSimpleTree = () => {
  const treeCopy = JSON.parse(JSON.stringify(simpleTree)) as TreeGardenNode;
  (treeCopy.childNodes?.black)!.classCounts = { right: 2 };
  return treeCopy;
};

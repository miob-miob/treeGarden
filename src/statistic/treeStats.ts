// todo calculate rate of missclasification

// todo use  https://gist.github.com/michhar/2dfd2de0d4f8727f873422c5d959fff5#file-titanic-csv for tests
// todo implement _class guard on dataSet
import { TreeGardenNode } from '../treeNode';
import { consistentDataSetGuard, DataSetSample } from '../dataSet/set';

export const getTreeAccuracy = (treeRootNode:TreeGardenNode, validationSet:DataSetSample[]) => {
  consistentDataSetGuard(validationSet, 'getMisclassificationRate');
  console.log('calculate it');
};



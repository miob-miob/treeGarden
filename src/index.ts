// top level exports - most useful functions
export { SplitCriteriaFn, SplitCriteriaDefinition, SplitOperator } from './split';

export { TreeGardenDataSample } from './dataSet/set';
export { TreeGardenNode } from './treeNode';
export {
  TreeGardenConfiguration,
  buildAlgorithmConfiguration,
  defaultConfiguration,
  defaultAttributeConfiguration
} from './algorithmConfiguration';
export { growTree } from './growTree';
export { growRandomForest } from './growRandomForest';
export { getTreePrediction, getRandomForestPrediction } from './predict';
export { getTreeAccuracy } from './statistic/treeStats';
export { getDividedSet } from './dataSet/dividingAndBootstrapping';

// reexport scoped stuff - i do it in this silly way (it would be easier just export object of functions)
// because namespaces would not be recognised by typedoc tool - it would be exported like variable
export * as split from './shapesForExport/split.module';
export * as configuration from './shapesForExport/configuration.module';
export * as dataSet from './shapesForExport/dataSet.module';
export * as impurity from './shapesForExport/impurity.module';
export * as prune from './shapesForExport/prune.module';
export * as sampleTrees from './shapesForExport/sampleTrees.module';
export * as sampleDataSets from './shapesForExport/sampleDataSets.module';
export * as statistics from './shapesForExport/statistics.module';
export * as tree from './shapesForExport/tree.module';
export * as predict from './shapesForExport/predict.module';
export * as constants from './shapesForExport/constants.module';

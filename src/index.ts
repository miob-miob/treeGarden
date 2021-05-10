import {
  buildAlgorithmConfiguration, c45Config
} from './algorithmConfiguration';


import { titanicSet } from './sampleDataSets';
import { induceTree } from './induceTree';
import {
  composeStopFunctions,
  getPrunedTreeByCostComplexityPruning,
  getPrunedTreeByPessimisticPruning,
  getPrunedTreeByReducedErrorPruning,
  stopIfMinimalNumberOfSamplesInLeafNode,
  stopIfNoSplitsAvailable,
  stopIfPure
} from './pruneTree';
import { getDividedSet } from './dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from './statistic/treeStats';

export {
  buildAlgorithmConfiguration, AlgorithmConfiguration
} from './algorithmConfiguration';
export { induceTree } from './induceTree';
export { getPredictedClassesOfSamples, getLeafNodesForSamples } from './classifyData';

const [rest, validation] = getDividedSet(titanicSet, 0.9);
const [training, pruning] = getDividedSet(rest, 0.8);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);

const myConfig = buildAlgorithmConfiguration(training, {
  ...c45Config,
  // ...cartConfig,
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: { sibsp: { dataType: 'discrete' } },
  shouldWeStopGrowth: composeStopFunctions(
    stopIfPure,
    stopIfNoSplitsAvailable,
    stopIfMinimalNumberOfSamplesInLeafNode(3)
  )
});
console.log(myConfig);

const tree = induceTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
const prunedTree = getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
// const prunedTree = getPrunedTreeByPessimisticPruning(tree);
// const prunedTree = getPrunedTreeByReducedErrorPruning(tree, pruning, myConfig);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

console.log(JSON.stringify(prunedTree));


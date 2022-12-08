import {
  buildAlgorithmConfiguration,
  growTree,
  getTreeAccuracy,
  dataSet,
  prune,
  sampleDataSets,
  statistics
} from '../../src';


const [training, validation] = dataSet.getDividedSet(sampleDataSets.irisSet, 0.8);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);


const myConfig = buildAlgorithmConfiguration(sampleDataSets.irisSet, {
  shouldWeStopGrowth: prune.stopRules(
    prune.stopIfDepthIs(30),
    prune.stopIfMinimalNumberOfSamplesInNode(20)
  )
});
console.log(myConfig);

const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${statistics.getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);


// if we want to run real c4.5 we should use 'prune.getPrunedTreeByPessimisticPruning' method
let prunedTree = prune.getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
console.log(`Pruned by cost complexity pruning: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);
prunedTree = prune.getPrunedTreeByPessimisticPruning(tree);
console.log(`Pruned by pessimistic pruning: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

prunedTree = prune.getPrunedTreeByReducedErrorPruning(tree, validation, myConfig);
console.log(`Pruned by reduced error pruning: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);
console.log(statistics.getNumberOfTreeNodes(tree));
console.log(JSON.stringify(prunedTree));

// console.log('\n\n\n',JSON.stringify(tree))


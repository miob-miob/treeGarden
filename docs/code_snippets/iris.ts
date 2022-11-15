import {
  buildAlgorithmConfiguration,
  configuration,
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
  ...configuration.c45Config,
  attributes: {
    sepal_length: { dataType: 'continuous' },
    sepal_width: { dataType: 'continuous' },
    petal_length: { dataType: 'continuous' },
    petal_width: { dataType: 'continuous' }
  },
  shouldWeStopGrowth: prune.stopRules(
    prune.stopIfDepthIs(30),
    prune.stopIfMinimalNumberOfSamplesInNode(20)
  )
});
console.log(myConfig);

const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${statistics.getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);


// if we want to run real c4.5 we should use 'prune.getPrunedTreeByPessimisticPruning' method
const prunedTree = prune.getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
console.log(`Pruned: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

console.log(JSON.stringify(prunedTree));

// console.log('\n\n\n',JSON.stringify(tree))


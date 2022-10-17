import {
  buildAlgorithmConfiguration,
  growTree,
  getTreeAccuracy,
  prune,
  sampleDataSets,
  dataSet,
  statistics,
  impurity
} from '../src';


const [training, validation] = dataSet.getDividedSet(sampleDataSets.titanicSet, 0.85);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);


const myConfig = buildAlgorithmConfiguration(sampleDataSets.titanicSet, {
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: { pclass: { dataType: 'discrete' }, parch: { dataType: 'discrete' }, sibs: { dataType: 'discrete' } },
  getScoreForSplit: impurity.getInformationGainRatioForSplit,
  biggerScoreBetterSplit: true
});


const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${statistics.getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
const prunedTree = prune.getPrunedTreeByPessimisticPruning(tree);
console.log(`Pruned: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// console.log(JSON.stringify(prunedTree));



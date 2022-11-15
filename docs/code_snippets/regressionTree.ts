import {
  impurity,
  dataSet,
  sampleDataSets,
  prune,
  statistics,
  getTreeAccuracy,
  growTree,
  buildAlgorithmConfiguration
} from '../../src';


const [training, validation] = dataSet.getDividedSet(sampleDataSets.housePrices, 0.7);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);


const myConfig = buildAlgorithmConfiguration(sampleDataSets.housePrices, {
  treeType: 'regression',
  getScoreForSplit: impurity.getScoreForRegressionTreeSplit,
  biggerScoreBetterSplit: false,
  excludedAttributes: ['ADDRESS', 'POSTED_BY'],
  attributes: { SQUARE_FT: { dataType: 'continuous' }, LONGITUDE: { dataType: 'continuous' }, LATITUDE: { dataType: 'continuous' } }
});
console.log(myConfig);


const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${statistics.getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
const prunedTree = prune.getPrunedTreeByReducedErrorPruning(tree, validation, myConfig);
console.log(`Pruned: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// console.log(JSON.stringify(prunedTree));

console.log('\n\n\n', JSON.stringify(prunedTree));


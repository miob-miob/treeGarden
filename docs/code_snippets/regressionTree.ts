import {
  impurity,
  dataSet,
  sampleDataSets,
  prune,
  statistics,
  getTreeAccuracy,
  growTree,
  buildAlgorithmConfiguration,
  getTreePrediction
} from '../../src';

// let`s build regression tree!

// first lets divide data set into two parts - 60% of samples to training set, rest to validation
const [training, validation] = dataSet.getDividedSet(sampleDataSets.housePrices, 0.6);

// how many samples we have in each data set
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);

// how to turn default configuration to configuration for regression tree?
const myConfig = buildAlgorithmConfiguration(sampleDataSets.housePrices, {
  treeType: 'regression', // we have to choose tree type - classification or regression
  getScoreForSplit: impurity.getScoreForRegressionTreeSplit, // [split scoring function]
  biggerScoreBetterSplit: false, // [split scoring function]
  excludedAttributes: ['ADDRESS', 'POSTED_BY'], // lets exclude attributes that will probably not help with accuracy

  // data set is not processed in best way - all fields are strings!
  // automatic recognition of dataType would not work here
  // we can overcome it by setting dataType manually - [force data type]
  attributes: {
    SQUARE_FT: { dataType: 'continuous' },
    LONGITUDE: { dataType: 'continuous' },
    LATITUDE: { dataType: 'continuous' }
  }
});

// check config
console.log(myConfig);

// let`s grow tree on training data set
const tree = growTree(myConfig, training);


// ouch this tree is big !!!
// if you grow tree without any restriction it usually over-fits training data and also is not useful for data exploration
// [un-pruned tree]
console.log(`Raw tree: Number of nodes,${statistics.getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);


// there is multiple ways how to prune your raw tree [tree pruning]
// after pruning tree is smaller and accuracy on validation data set is better!
const prunedTree = prune.getPrunedTreeByReducedErrorPruning(tree, validation, myConfig);

// lets see how accuracy and size of tree changed after pruning
// [regression tree accuracy]
console.log(`Pruned: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// took one example from data set to use our new regression tree - its price was around 52 - see how close we will be
const myHouse = {
  POSTED_BY: 'Owner',
  UNDER_CONSTRUCTION: '0',
  RERA: '1',
  'BHK_NO.': '3',
  BHK_OR_RK: 'BHK',
  SQUARE_FT: 1181.012946,
  READY_TO_MOVE: '1',
  RESALE: '1',
  ADDRESS: 'Kharar,Mohali',
  LONGITUDE: 30.74,
  LATITUDE: 76.65
};
// result
console.log('Price of my house will be:', getTreePrediction(myHouse, prunedTree, myConfig));

// let`s output it for visualization
console.log('\n\n\n', JSON.stringify(prunedTree));


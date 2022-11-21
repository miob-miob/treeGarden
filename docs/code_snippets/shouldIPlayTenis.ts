import {
  buildAlgorithmConfiguration,
  growTree,
  getTreePrediction,
  sampleDataSets
} from '../../src';

// data set of interest is bundled with tree-garden itself
// [data set]
const { tennisSet } = sampleDataSets;

// configuration that is used for training and prediction
// is 'guessed' from training data itself
// empty object is partial configuration we want to use
// [configuration]
const algorithmConfig = buildAlgorithmConfiguration(tennisSet, {});

// we can check what we got
console.log('Config:\n', algorithmConfig);


// lets train decision tree
// [tree]
const tree = growTree(algorithmConfig, tennisSet);

// see how tree looks like?
console.log('Tree:\n', tree);

// our sample of interest
// [sample]
const sample = {
  outlook: 'Rain', temp: 'Mild', humidity: 'Normal', wind: 'Weak'
};

// [result]
const shouldWeGoToPlayTennis = getTreePrediction(sample, tree, algorithmConfig);

console.log('Result:\n', 'Should i stay or should i go?', shouldWeGoToPlayTennis);


// [output for visualization tool]
console.log('Json output:\n', JSON.stringify(tree));

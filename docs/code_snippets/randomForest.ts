import {
  growRandomForest,
  sampleDataSets,
  statistics,
  impurity,
  getRandomForestPrediction,
  buildAlgorithmConfiguration
} from '../../src';

// titanic data set is bundled with tree-garden
const { titanicSet } = sampleDataSets;


// let`s tweak configuration a bit
const config = buildAlgorithmConfiguration(titanicSet, {

  // as i know these attributes cannot have any impact on final outcome - decided to decrease
  // computation complexity and do not count these fields in
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: {
    pclass: {
      dataType: 'discrete' // i want to treat class of passenger as discrete value, not number
    }
  },

  // several hundreds of trees is optimal
  numberOfTrees: 500,

  // [impurity scoring function]
  getScoreForSplit: impurity.getInformationGainForSplit

});

// check cofig
console.log('config:\n', config);


// our favorite titanic passenger
const KateWinslet = {
  fare: 15.0458,
  name: 'Kate Winslet',
  embarked: 'C',
  age: 29,
  parch: 0,
  pclass: 3, // this time Kate was traveling in low cost style ;)
  sex: 'female',
  ticket: '2687',
  sibsp: 1 // and she has sister aboard, Leonardo will have hard time...
};

// lets start with training...
const { trees, oobError } = growRandomForest(config, sampleDataSets.titanicSet);


// lets check some metrics of trained forest:
// [out of the bag error]
console.log(`Out of the bag error for our trained forrest: ${oobError} % correct classifications!`);

// How deep is Your..... forest...
const depths = trees.map((tree) => statistics.getTreeDepth(tree));
console.log(`Trees depth:\n\taverage: ${statistics.getArithmeticAverage(depths)}\n\tmedian:${statistics.getMedian(depths)}`);

// and finally what about Kate?
// [random forest prediction outcome]
const wouldSheSurvive = getRandomForestPrediction(KateWinslet, trees, config);
console.log('Would Kate survive on titanic? - ', wouldSheSurvive);


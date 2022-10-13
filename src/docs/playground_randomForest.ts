import { growRandomForest } from '../growRandomForest';
import { buildAlgorithmConfiguration } from '../index';
import { titanicSet } from '../sampleDataSets';
import { getRandomForestPrediction } from '../predict';
import { getMostCommonTagOfSamplesInNode } from '../dataSet/replaceMissingValues';
import { stopRules, stopIfDepthIs, stopIfMinimalNumberOfSamplesInNode } from '../pruneTree';
import { getInformationGainRatioForSplit, getInformationGainForSplit } from '../impurity/entropy';
import { getTreeDepth } from '../statistic/treeStats';


const config = buildAlgorithmConfiguration(titanicSet, {
  // excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  // getTagOfSampleWithMissingValueWhileClassifying: getMostCommonTagOfSamplesInNode,
  numberOfTrees: 10,
  // getTagOfSampleWithMissingValueWhileClassifying: undefined,
  getScoreForSplit: getInformationGainRatioForSplit
  // shouldWeStopGrowth: stopRules(
  //   stopIfDepthIs(15)
  // )

});

console.log(config);

const passenger = {
  fare: 7.2292,
  name: 'Ayoub, Miss. Banoura',
  embarked: 'C',
  age: 13,
  parch: 0,
  pclass: 3,
  sex: 'female',
  ticket: '2687',
  sibsp: 0,
  _label: 781,
  _id: 'd3245bae-62e1-4ff1-ac2f-0a30449d4d00'
};

const { trees, oobError } = growRandomForest(config, titanicSet);

console.log(`Out of the bag error for our trained forrest: ${oobError} % correct classifications!`);
console.log('Would our passenger survive on titanic? - ', getRandomForestPrediction(passenger, trees, config));

trees.forEach((tree) => {
  console.log(getTreeDepth(tree));
});

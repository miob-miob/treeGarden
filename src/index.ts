import { tennisSet } from './sampleDataSets';
import { induceTree } from './induceTree';
import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from './impurity/gini';


const algorithmConfig = buildAlgorithmConfiguration(tennisSet, {
  impurityScoringForSplit: getGiniIndexForSplit,
  biggerImpurityScoreBetterSplit: false
//  onlyBinarySplits: true
});


const tree = induceTree(algorithmConfig, tennisSet);

console.log(JSON.stringify(tree));
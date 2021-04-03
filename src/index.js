
import { tennisSet } from './sampleDataSets';
import { induceTree } from './induceTree';
import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from './utils/impurity/gini';


const algorithmConfig = buildAlgorithmConfiguration(tennisSet, {
  impurityScoringForSplit: getGiniIndexForSplit,
  biggerImpurityScoreBetterSplit: false
});


const tree = induceTree(algorithmConfig, tennisSet);

console.log(JSON.stringify(tree));

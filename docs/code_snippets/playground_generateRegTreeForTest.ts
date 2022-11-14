import {
  buildAlgorithmConfiguration,
  growTree,
  sampleDataSets, impurity, prune
} from '../../src';

const algorithmConfiguration = buildAlgorithmConfiguration(sampleDataSets.simpleSetForRegression, {
  treeType: 'regression',
  getScoreForSplit: impurity.getScoreForRegressionTreeSplit,
  shouldWeStopGrowth: prune.stopRules(prune.stopIfDepthIs(1))
});

const regressionTree = growTree(algorithmConfiguration, sampleDataSets.simpleSetForRegression);

console.log(JSON.stringify(regressionTree));


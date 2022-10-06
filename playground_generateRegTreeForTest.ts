import { buildAlgorithmConfiguration } from './src/algorithmConfiguration';
import { growTree } from './src/growTree';
import { simpleSetForRegression } from './src/sampleDataSets';
import { getScoreForRegressionTreeSplit } from './src/impurity/regressionTreeScore';
import { stopRules } from './src/pruneTree';
import { stopIfDepthIs } from './src/pruneTree/prePrunning';


const algorithmConfiguration = buildAlgorithmConfiguration(simpleSetForRegression, {
  treeType: 'regression',
  getScoreForSplit: getScoreForRegressionTreeSplit,
  shouldWeStopGrowth: stopRules(stopIfDepthIs(1))
});

const regressionTree = growTree(algorithmConfiguration, simpleSetForRegression);

console.log(JSON.stringify(regressionTree));


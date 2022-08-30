import { buildAlgorithmConfiguration } from './src/algorithmConfiguration';
import { growTree } from './src/growTree';
import { simpleSetForRegression } from './src/sampleDataSets';
import { getScoreForRegressionTreeSplit } from './src/impurity/regressionTreeScore';
import { composeStopFunctions } from './src/pruneTree';
import { stopIfDepthIs } from './src/pruneTree/prePrunning';


const algorithmConfiguration = buildAlgorithmConfiguration(simpleSetForRegression, {
  treeType: 'regression',
  getScoreForSplit: getScoreForRegressionTreeSplit,
  shouldWeStopGrowth: composeStopFunctions(stopIfDepthIs(1))
});

const regressionTree = growTree(algorithmConfiguration, simpleSetForRegression);

console.log(JSON.stringify(regressionTree));


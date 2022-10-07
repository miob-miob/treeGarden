import { buildAlgorithmConfiguration } from '../algorithmConfiguration';
import { growTree } from '../growTree';
import { simpleSetForRegression } from '../sampleDataSets';
import { getScoreForRegressionTreeSplit } from '../impurity/regressionTreeScore';
import { stopRules } from '../pruneTree';
import { stopIfDepthIs } from '../pruneTree/prePrunning';


const algorithmConfiguration = buildAlgorithmConfiguration(simpleSetForRegression, {
  treeType: 'regression',
  getScoreForSplit: getScoreForRegressionTreeSplit,
  shouldWeStopGrowth: stopRules(stopIfDepthIs(1))
});

const regressionTree = growTree(algorithmConfiguration, simpleSetForRegression);

console.log(JSON.stringify(regressionTree));


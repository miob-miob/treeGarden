import {
  buildAlgorithmConfiguration,
  growTree
} from '../index';

import { housePrices } from '../sampleDataSets';

import {
  stopRules,
  getPrunedTreeByReducedErrorPruning,
  getPrunedTreeByCostComplexityPruning,
  stopIfMinimalNumberOfSamplesInNode
} from '../pruneTree';
import { getDividedSet } from '../dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from '../statistic/treeStats';
import { getScoreForRegressionTreeSplit } from '../impurity/regressionTreeScore';


const [training, validation] = getDividedSet(housePrices, 0.7);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);


const myConfig = buildAlgorithmConfiguration(housePrices, {
  treeType: 'regression',
  getScoreForSplit: getScoreForRegressionTreeSplit,
  biggerScoreBetterSplit: false,
  excludedAttributes: ['ADDRESS', 'POSTED_BY'],
  attributes: { SQUARE_FT: { dataType: 'continuous' }, LONGITUDE: { dataType: 'continuous' }, LATITUDE: { dataType: 'continuous' } },
  shouldWeStopGrowth: stopRules(
    stopIfMinimalNumberOfSamplesInNode(10)
  )
});
console.log(myConfig);


const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
const prunedTree = getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// console.log(JSON.stringify(prunedTree));

console.log('\n\n\n', JSON.stringify(prunedTree));


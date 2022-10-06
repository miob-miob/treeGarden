import {
  buildAlgorithmConfiguration
} from './src';

import {housePrices} from "./src/sampleDataSets";
import { growTree } from './src';
import {
  stopRules,
  getPrunedTreeByReducedErrorPruning,
  getPrunedTreeByCostComplexityPruning,
  stopIfMinimalNumberOfSamplesInInnerNode,
  stopIfNoSplitsAvailable,
  stopIfPure
} from './src/pruneTree';
import { getDividedSet } from './src/dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from './src/statistic/treeStats';
import {getScoreForRegressionTreeSplit} from "./src/impurity/regressionTreeScore";


const [training, validation] = getDividedSet(housePrices, 0.7);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);



const myConfig = buildAlgorithmConfiguration(housePrices, {
  treeType:'regression',
  getScoreForSplit:getScoreForRegressionTreeSplit,
  biggerScoreBetterSplit:false,
  excludedAttributes:['ADDRESS','POSTED_BY'],
  attributes: { SQUARE_FT: { dataType: 'continuous' }, LONGITUDE:{dataType: 'continuous'},LATITUDE:{dataType: "continuous"} },
  shouldWeStopGrowth: stopRules(
    stopIfPure,
    stopIfNoSplitsAvailable,
    stopIfMinimalNumberOfSamplesInInnerNode(10)
  )
});
console.log(myConfig);



const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
const prunedTree = getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// console.log(JSON.stringify(prunedTree));

console.log('\n\n\n',JSON.stringify(prunedTree))


import {
  buildAlgorithmConfiguration
} from './src';

import {housePrices} from "./src/sampleDataSets";
import { induceTree } from './src';
import {
  composeStopFunctions,
  getPrunedTreeByCostComplexityPruning,
  getPrunedTreeByPessimisticPruning,
  getPrunedTreeByReducedErrorPruning,
  stopIfMinimalNumberOfSamplesInLeafNode,
  stopIfNoSplitsAvailable,
  stopIfPure
} from './src/pruneTree';
import { getDividedSet } from './src/dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from './src/statistic/treeStats';
import {getScoreForRegressionTreeSplit} from "./src/impurity/regressionTreeScore";


const [rest, validation] = getDividedSet(housePrices, 0.95);
const [training, pruning] = getDividedSet(rest, 0.8);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);



const myConfig = buildAlgorithmConfiguration(housePrices, {
  treeType:'regression',
  getScoreForSplit:getScoreForRegressionTreeSplit,
  biggerScoreBetterSplit:false,
  excludedAttributes:['ADDRESS','POSTED_BY'],
  attributes: { SQUARE_FT: { dataType: 'continuous' }, LONGITUDE:{dataType: 'continuous'},LATITUDE:{dataType: "continuous"} },
  shouldWeStopGrowth: composeStopFunctions(
    stopIfPure,
    stopIfNoSplitsAvailable,
    stopIfMinimalNumberOfSamplesInLeafNode(5)
  )
});
console.log(myConfig);

const tree = induceTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
// const prunedTree = getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
// const prunedTree = getPrunedTreeByPessimisticPruning(tree);
// const prunedTree = getPrunedTreeByReducedErrorPruning(tree, pruning, myConfig);
// console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// console.log(JSON.stringify(prunedTree));

console.log('\n\n\n',JSON.stringify(tree))


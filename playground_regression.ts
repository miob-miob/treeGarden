import {
  buildAlgorithmConfiguration
} from './src';

import {housePrices} from "./src/sampleDataSets";
import { growTree } from './src';
import {
  composeStopFunctions,
  getPrunedTreeByReducedErrorPruning,
  stopIfMinimalNumberOfSamplesInLeafNode,
  stopIfNoSplitsAvailable,
  stopIfPure
} from './src/pruneTree';
import { getDividedSet } from './src/dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from './src/statistic/treeStats';
import {getScoreForRegressionTreeSplit} from "./src/impurity/regressionTreeScore";


const [rest, validation] = getDividedSet(housePrices, 0.8);
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
    stopIfMinimalNumberOfSamplesInLeafNode(10)
  )
});
console.log(myConfig);



const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
const prunedTree = getPrunedTreeByReducedErrorPruning(tree, pruning, myConfig);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// console.log(JSON.stringify(prunedTree));

console.log('\n\n\n',JSON.stringify(prunedTree))


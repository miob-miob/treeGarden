import {
  buildAlgorithmConfiguration
} from './src';

import {c45Config} from "./src/algorithmConfiguration";

import { titanicSet,irisSet } from './src/sampleDataSets';
import { growTree } from './src';
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

const irisAsNumbers = irisSet.map((sample)=>{
  return Object.fromEntries(Object.entries(sample).map(([key,value])=>{
    if(isNaN(parseFloat(value))){
      return [key, value]
    }

    return [key,parseFloat(value)]
  }))
})

const [rest, validation] = getDividedSet(titanicSet, 0.95);
const [training, pruning] = getDividedSet(rest, 0.8);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);



const myConfig = buildAlgorithmConfiguration(titanicSet, {
  ...c45Config,
  // ...cartConfig,
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: { sibsp: { dataType: 'discrete' }, pclass:{dataType: 'discrete'},parch:{dataType: "discrete"} },
  shouldWeStopGrowth: composeStopFunctions(
    stopIfPure,
    stopIfNoSplitsAvailable,
    // stopIfMinimalNumberOfSamplesInLeafNode(3)
  )
});


console.log(myConfig);

const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
// const prunedTree = getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
// const prunedTree = getPrunedTreeByPessimisticPruning(tree);
const prunedTree = getPrunedTreeByReducedErrorPruning(tree, pruning, myConfig);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

console.log(JSON.stringify(prunedTree));

// console.log('\n\n\n',JSON.stringify(tree))


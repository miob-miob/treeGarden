import {
  buildAlgorithmConfiguration
} from './src';

import {c45Config} from "./src/algorithmConfiguration";

import { irisSet } from './src/sampleDataSets';
import { growTree } from './src';
import {
  composeStopFunctions,
  getPrunedTreeByPessimisticPruning,
  stopIfNoSplitsAvailable,
  stopIfPure
} from './src/pruneTree';
import { getDividedSet } from './src/dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from './src/statistic/treeStats';


const [training, validation] = getDividedSet(irisSet, 0.9);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);



const myConfig = buildAlgorithmConfiguration(irisSet, {
  ...c45Config,
  attributes: {
    // sepal_length: { dataType: 'continuous' },
    sepal_width:{dataType: 'continuous'},
    petal_length:{dataType: 'continuous'},
    petal_width:{dataType: 'continuous'}
    },
  shouldWeStopGrowth: composeStopFunctions(
    stopIfPure,
    stopIfNoSplitsAvailable,
    // stopIfMinimalNumberOfSamplesInLeafNode(3)
  )
});
console.log(myConfig);

const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);

const prunedTree = getPrunedTreeByPessimisticPruning(tree);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

console.log(JSON.stringify(prunedTree));

// console.log('\n\n\n',JSON.stringify(tree))


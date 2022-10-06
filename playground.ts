import {
  buildAlgorithmConfiguration
} from './src';

import {c45Config} from "./src/algorithmConfiguration";

import { titanicSet } from './src/sampleDataSets';
import { growTree } from './src';
import {
  stopRules,
  getPrunedTreeByCostComplexityPruning,
  getPrunedTreeByPessimisticPruning,
  getPrunedTreeByReducedErrorPruning,
  stopIfMinimalNumberOfSamplesInInnerNode,
  stopIfNoSplitsAvailable,
  stopIfPure
} from './src/pruneTree';
import { getDividedSet } from './src/dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from './src/statistic/treeStats';
import {stopIfDepthIs} from "./src/pruneTree/prePrunning";
import {cartConfig} from './src/algorithmConfiguration';
import {getDataSetWithReplacedValues} from "./src/dataSet/replaceMissingValues";


const [training, validation] = getDividedSet(titanicSet, 0.90);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);


// todo check miniml number of samples in leaf node  - we should check parent
const myConfig = buildAlgorithmConfiguration(titanicSet, {
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: { sibsp: { dataType: 'continuous' }, pclass:{dataType: 'discrete'},parch:{dataType: "discrete"} },
  shouldWeStopGrowth: stopRules(
    stopIfPure,
    stopIfNoSplitsAvailable,
    // stopIfDepthIs(5)
  )
});


console.log(myConfig);

const tree = growTree(myConfig, training);
const replacedValidation  = getDataSetWithReplacedValues({
  samplesToReplace: validation,
  algorithmConfiguration: myConfig
});
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, replacedValidation, myConfig)}`);
// const prunedTree = getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
const prunedTree = getPrunedTreeByPessimisticPruning(tree);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, replacedValidation, myConfig)}`);

console.log(JSON.stringify(prunedTree));

// console.log('\n\n\n',JSON.stringify(tree))


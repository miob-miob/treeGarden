import {
  buildAlgorithmConfiguration
} from '../index';

import {c45Config} from "../algorithmConfiguration";

import { titanicSet } from '../sampleDataSets';
import { growTree } from '../index';
import {
  stopRules,
  getPrunedTreeByCostComplexityPruning,
  getPrunedTreeByPessimisticPruning,
  getPrunedTreeByReducedErrorPruning,
  stopIfMinimalNumberOfSamplesInNode,
  stopIfNoSplitsAvailable,
  stopIfPure
} from '../pruneTree';
import { getDividedSet } from '../dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from '../statistic/treeStats';
import {stopIfDepthIs} from "../pruneTree/prePrunning";
import {cartConfig} from '../algorithmConfiguration';
import {getDataSetWithReplacedValues} from "../dataSet/replaceMissingValues";


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


import {
  buildAlgorithmConfiguration,
  growTree
} from '../index';

// import { c45Config, cartConfig } from '../algorithmConfiguration';

import { titanicSet } from '../sampleDataSets';

import {
  // getPrunedTreeByCostComplexityPruning,
  getPrunedTreeByPessimisticPruning
  // getPrunedTreeByReducedErrorPruning,
  // stopIfMinimalNumberOfSamplesInNode
} from '../pruneTree';
import { getDividedSet } from '../dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes, getTreeAccuracy } from '../statistic/treeStats';

import { getDataSetWithReplacedValues } from '../dataSet/replaceMissingValues';


const [training, validation] = getDividedSet(titanicSet, 0.90);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);


const myConfig = buildAlgorithmConfiguration(titanicSet, {
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: { sibsp: { dataType: 'continuous' }, pclass: { dataType: 'discrete' }, parch: { dataType: 'discrete' } }

});


console.log(myConfig);

const tree = growTree(myConfig, training);
const replacedValidation = getDataSetWithReplacedValues({
  samplesToReplace: validation,
  algorithmConfiguration: myConfig
});
console.log(`UNPRUNED: Number of nodes,${getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, replacedValidation, myConfig)}`);
// const prunedTree = getPrunedTreeByCostComplexityPruning(tree, training, myConfig);
const prunedTree = getPrunedTreeByPessimisticPruning(tree);
console.log(`Pruned: Number of nodes,${getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, replacedValidation, myConfig)}`);

console.log(JSON.stringify(prunedTree));

// console.log('\n\n\n',JSON.stringify(tree))


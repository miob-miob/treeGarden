import { titanicSet } from './sampleDataSets';
import { induceTree } from './induceTree';
import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from './impurity/gini';
import { getDividedSet } from './dataSet/dividingAndBootstrapping';
import { getNumberOfTreeNodes } from './treeNode';
import { getTreeAccuracy } from './statistic/treeStats';
import {
  getPrunedTreeByCostComplexityPruning,
  composeStopFunctions,
  stopIfMinimalNumberOfSamplesInLeafNode,
  stopIfNoSplitsAvailable,
  stopIfPure
} from './pruneTree';


const [validationTitanic, trainingTitanic] = getDividedSet(titanicSet, 0);
console.log('validation length', validationTitanic.length);
console.log('training length', trainingTitanic.length);
const algorithmConfig = buildAlgorithmConfiguration(trainingTitanic, {
  attributes: { pclass: { dataType: 'discrete' } },
  excludedAttributes: ['ticket', 'cabin', 'name'],
  impurityScoringForSplit: getGiniIndexForSplit,
  biggerImpurityScoreBetterSplit: false,
  shouldWeStopGrowth: composeStopFunctions(
    stopIfMinimalNumberOfSamplesInLeafNode(5),
    stopIfNoSplitsAvailable,
    stopIfPure
  )
//  onlyBinarySplits: true
});

// console.log(algorithmConfig);
const tree = induceTree(algorithmConfig, trainingTitanic);
const legthOfNonPruned = getNumberOfTreeNodes(tree);
const accUnpruned = getTreeAccuracy(tree, validationTitanic, algorithmConfig);
console.log('UNpuruned ', legthOfNonPruned, accUnpruned);

const prunedTree = getPrunedTreeByCostComplexityPruning(tree, trainingTitanic, algorithmConfig);

const legthOfPruned = getNumberOfTreeNodes(prunedTree);
const accOfPrunned = getTreeAccuracy(prunedTree, validationTitanic, algorithmConfig);
//
console.log('Leng of prunned, acc', legthOfPruned, accOfPrunned);
console.log(JSON.stringify(prunedTree));

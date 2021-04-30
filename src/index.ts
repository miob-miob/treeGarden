import { titanicSet } from './sampleDataSets';
import { induceTree } from './induceTree';
import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from './impurity/gini';
import { getDividedSet } from './dataSet/dividingAndBootstrapping';
import { getAllNonLeafNodes, getNumberOfTreeNodes } from './treeNode';
import { getPrunedTreeByReducedErrorPruning } from './pruneTree/reducedErrorPrunning';
import { getTreeAccuracy } from './statistic/treeStats';

const [validationTitanic, trainingTitanic] = getDividedSet(titanicSet, 0.4);
console.log('validation length', validationTitanic.length);
console.log('training length', trainingTitanic.length);
const algorithmConfig = buildAlgorithmConfiguration(trainingTitanic, {
  excludedAttributes: ['ticket', 'cabin', 'name'],
  impurityScoringForSplit: getGiniIndexForSplit,
  biggerImpurityScoreBetterSplit: false
//  onlyBinarySplits: true
});

console.log(algorithmConfig);
const tree = induceTree(algorithmConfig, trainingTitanic);
const legthOfNonPruned = getNumberOfTreeNodes(tree);
const accUnpruned = getTreeAccuracy(tree, validationTitanic, algorithmConfig);
console.log('UNpuruned ', legthOfNonPruned, accUnpruned, getAllNonLeafNodes);

const prunedTree = getPrunedTreeByReducedErrorPruning(tree, validationTitanic, algorithmConfig);

const legthOfPruned = getNumberOfTreeNodes(prunedTree);
const accOfPrunned = getTreeAccuracy(prunedTree, validationTitanic, algorithmConfig);

console.log('Leng of prunned, acc', legthOfPruned, accOfPrunned);


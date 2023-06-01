# tree-garden [![Types and tests](https://github.com/miob-miob/treeGarden/actions/workflows/typesAndTests.yml/badge.svg)](https://github.com/miob-miob/treeGarden/actions/workflows/typesAndTests.yml)

![](https://img.shields.io/github/package-json/v/miob-miob/treeGarden)


### Let`s bring a bit of machine-learning on the web! [see tree-garden in action!](https://tree-garden.miob.org/) (docs)



### Peek in :

```typescript
import {
  buildAlgorithmConfiguration,
  growTree,
  getTreeAccuracy,
  prune,
  sampleDataSets,
  dataSet,
  statistics,
  impurity
} from 'tree-garden';


const [training, validation] = dataSet.getDividedSet(sampleDataSets.titanicSet, 0.85);
console.log(`length of validation: ${validation.length}, length of training: ${training.length} `);


const myConfig = buildAlgorithmConfiguration(sampleDataSets.titanicSet, {
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'], // exclude some attrs that we do not want to use
  attributes: { pclass: { dataType: 'discrete' }, parch: { dataType: 'discrete' }, sibs: { dataType: 'discrete' } }, // consider some number attributes as discrete values
  getScoreForSplit: impurity.getInformationGainRatioForSplit,
  biggerScoreBetterSplit: true
});

const tree = growTree(myConfig, training);
console.log(`UNPRUNED: Number of nodes,${statistics.getNumberOfTreeNodes(tree)} acc:${getTreeAccuracy(tree, validation, myConfig)}`);
const prunedTree = prune.getPrunedTreeByCostComplexityPruning(tree, sampleDataSets.titanicSet, myConfig);
console.log(`Pruned: Number of nodes,${statistics.getNumberOfTreeNodes(prunedTree)} acc:${getTreeAccuracy(prunedTree, validation, myConfig)}`);

// console.log(JSON.stringify(prunedTree));

```

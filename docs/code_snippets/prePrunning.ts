import {
  growTree,
  buildAlgorithmConfiguration,
  sampleDataSets,
  prune,
  getTreeAccuracy,
  statistics
} from '../../src';

const { titanicSet } = sampleDataSets;

const configForFullTree = buildAlgorithmConfiguration(titanicSet);


const configForSmallTeee = buildAlgorithmConfiguration(titanicSet, {
  shouldWeStopGrowth: prune.stopRules(
    prune.stopIfMinimalNumberOfSamplesInNode(200),
    prune.stopIfDepthIs(5)
  )
});

const fullTree = growTree(configForFullTree, titanicSet);
const smallTree = growTree(configForSmallTeee, titanicSet);


// am curious ;)
console.log('Full tree:\n\t Number of nodes:', statistics.getNumberOfTreeNodes(fullTree), 'Accuracy:', getTreeAccuracy(fullTree, titanicSet, configForFullTree));
console.log('Small tree:\n\t Number of nodes:', statistics.getNumberOfTreeNodes(smallTree), 'Accuracy:', getTreeAccuracy(smallTree, titanicSet, configForFullTree));

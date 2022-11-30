import {
  growTree,
  buildAlgorithmConfiguration,
  sampleDataSets,
  impurity,
  prune,
  getTreeAccuracy,
  statistics,
  dataSet
} from '../../src';

// lets try it on titanic data set - bundled with tree-garden
const ourDataSet = sampleDataSets.titanicSet;

// first lets build two configurations with different impurity scoring functions
const informationGainConfig = buildAlgorithmConfiguration(ourDataSet, {
  getScoreForSplit: impurity.getInformationGainForSplit
});

const informationGainRatioConfig = buildAlgorithmConfiguration(ourDataSet, {
  getScoreForSplit: impurity.getInformationGainRatioForSplit
});


// create data sets for cross validation
const crossValidationDataSets = dataSet.getKFoldCrossValidationDataSets(ourDataSet, 10);

// calculate accuracy for each configuration
const [informationGainAccuracy, informationGainRatioAccuracy] = [informationGainConfig, informationGainRatioConfig]
  .map((configuration) => {
    const accuracies = crossValidationDataSets.map(({ validation, training }) => {
      const tree = growTree(configuration, training);
      const prunedTree = prune.getPrunedTreeByReducedErrorPruning(tree, validation, configuration);
      return getTreeAccuracy(prunedTree, validation, configuration);
    });
    // output all ten configurations
    console.log(accuracies);
    return statistics.getArithmeticAverage(accuracies);
  });


console.log('Information gain average accuracy:\t', informationGainAccuracy);
console.log('Information gain ratio average accuracy:\t', informationGainRatioAccuracy);


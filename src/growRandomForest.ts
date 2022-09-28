import { AlgorithmConfiguration } from './algorithmConfiguration';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from './dataSet/set';
import {
  defaultRandomForestConfiguration,
  getAlgorithmConfigForEachTree,
  RandomForestConfiguration
} from './algorithmConfiguration/randomForestConfiguration';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { growTree } from './growTree';
import { getBootstrappedDataSet, getBootstrappedDataSetAndOutOfTheBagRest } from './dataSet/dividingAndBootstrapping';
import { enrichDataSetWithUniqueIds } from './dataSet/enrichDataSetWithUniqueIds';
import { getOutOfTheBagError } from './statistic/randomForestStats';
import { TreeGardenNode } from './treeNode';


export const growRandomForest = (
  randomForestAlgorithmConfiguration:Partial<RandomForestConfiguration>,
  algorithmConfiguration:AlgorithmConfiguration,
  dataSet : TreeGardenDataSample[]
) => {
  consistentDataSetGuard(dataSet, 'growRandomForest');
  continuousAttributesGuard(algorithmConfiguration, dataSet, 'growRandomForest');
  const randomForestConfig = { ...defaultRandomForestConfiguration, ...randomForestAlgorithmConfiguration };
  const readyDataSet = getDataSetWithReplacedValues({ samplesToReplace: dataSet, algorithmConfiguration });

  const numberOfSamplesToBootstrap = randomForestConfig.numberOfBootstrappedSamples || readyDataSet.length;

  // ensure _ids in data set - needed for calculation of oob error
  if (randomForestConfig.calculateOutOfTheBagError) {
    enrichDataSetWithUniqueIds(readyDataSet);
  }

  // different attributes per tree
  const configsForTrees = getAlgorithmConfigForEachTree(readyDataSet, algorithmConfiguration, randomForestConfig);
  const trainedTreesAndOutOfBagSets = configsForTrees
    .map((singleTreeConfig) => {
      const [trainingDataSet, outOfBagSet] = randomForestConfig.calculateOutOfTheBagError
        ? getBootstrappedDataSetAndOutOfTheBagRest(readyDataSet, numberOfSamplesToBootstrap)
        : [getBootstrappedDataSet(readyDataSet, numberOfSamplesToBootstrap)];

      // todo place for parallelization (but limited to clonable object)
      return [growTree(singleTreeConfig, trainingDataSet), outOfBagSet] as const;
    });

  type OutOfTheBagSet = ReturnType<typeof getBootstrappedDataSetAndOutOfTheBagRest>[1];
  return {
    trees: trainedTreesAndOutOfBagSets.map((treeAndOobSet) => treeAndOobSet[0]),
    oobError: randomForestConfig.calculateOutOfTheBagError ? getOutOfTheBagError(
      trainedTreesAndOutOfBagSets as [TreeGardenNode, OutOfTheBagSet][],
      readyDataSet,
      algorithmConfiguration,
      randomForestConfig.majorityVotingFn
    ) : undefined,
    treesAndOobSets: trainedTreesAndOutOfBagSets
  };
};

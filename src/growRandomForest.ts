import { AlgorithmConfiguration } from './algorithmConfiguration';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from './dataSet/set';
import {
  getAlgorithmConfigForEachTree,
  RandomForestConfiguration
} from './algorithmConfiguration/randomForestConfiguration';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { growTree } from './growTree';
import { getBootstrappedDataSet, getBootstrappedDataSetAndOutOfTheBagRest } from './dataSet/dividingAndBootstrapping';
import { enrichDataSetWithUniqueIds } from './dataSet/enrichDataSetWithUniqueIds';


export const growRandomForest = (
  randomForestAlgorithmConfiguration:RandomForestConfiguration,
  algorithmConfiguration:AlgorithmConfiguration,
  dataSet : TreeGardenDataSample[]
) => {
  console.log(randomForestAlgorithmConfiguration, algorithmConfiguration, dataSet);
  consistentDataSetGuard(dataSet, 'growRandomForest');
  continuousAttributesGuard(algorithmConfiguration, dataSet, 'growRandomForest');
  const readyDataSet = getDataSetWithReplacedValues({ samplesToReplace: dataSet, algorithmConfiguration });

  const numberOfSamplesToBootstrap = randomForestAlgorithmConfiguration.numberOfBootstrappedSamples || readyDataSet.length;

  // ensure _ids in data set - needed for calculation of oob error
  if (randomForestAlgorithmConfiguration.calculateOutOfTheBagError) {
    enrichDataSetWithUniqueIds(readyDataSet);
  }
  // different attributes per tree
  const configsForTrees = getAlgorithmConfigForEachTree(readyDataSet, algorithmConfiguration, randomForestAlgorithmConfiguration);
  const trainedTreesAndOutOfBagSets = configsForTrees
    .map((singleTreeConfig) => {
      const [trainingDataSet, outOfBagSet] = randomForestAlgorithmConfiguration.calculateOutOfTheBagError
        ? getBootstrappedDataSetAndOutOfTheBagRest(readyDataSet, numberOfSamplesToBootstrap)
        : [getBootstrappedDataSet(readyDataSet, numberOfSamplesToBootstrap)];

      // todo place ideal for parallelization
      return [growTree(singleTreeConfig, trainingDataSet), outOfBagSet];
    });



};

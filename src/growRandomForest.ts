import { AlgorithmConfiguration } from './algorithmConfiguration';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from './dataSet/set';
import { RandomForestConfiguration } from './algorithmConfiguration/randomForestConfiguration';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';


export const growRandomForest = (
  randomForestAlgorithmConfiguration:RandomForestConfiguration,
  algorithmConfiguration:AlgorithmConfiguration,
  dataSet : TreeGardenDataSample[]
) => {
  console.log(randomForestAlgorithmConfiguration, algorithmConfiguration, dataSet);
  consistentDataSetGuard(dataSet, 'growRandomForest');
  continuousAttributesGuard(algorithmConfiguration, dataSet, 'growRandomForest');
  const readyDataSet = getDataSetWithReplacedValues({ samplesToReplace: dataSet, algorithmConfiguration });
  if (randomForestAlgorithmConfiguration.calculateOutOfTheBagError) {
    // 1. add id on every sample if there is not + warn user + check duplicity of IDS => every sample must be unique ID
    // 2. on every tree put hash of unused IDs
    // 3. for every sample find trees on which it was not trained and use their output for oob error
    const  ll = {}
  }
};

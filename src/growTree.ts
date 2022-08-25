import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { AlgorithmConfiguration } from './algorithmConfiguration';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from './dataSet/set';
import { rawGrowTree } from './rawGrowTree';


export const growTree = (fullConfiguration:AlgorithmConfiguration, dataSet:TreeGardenDataSample[]) => {
  if (!fullConfiguration.buildTime) {
    throw new Error('You cannot use just partial configuration in "growTree" function, build it with "buildAlgorithmConfiguration"');
  }
  consistentDataSetGuard(dataSet, 'growTree');

  continuousAttributesGuard(fullConfiguration, dataSet, 'growTree');
  const readyToGoDataSet = getDataSetWithReplacedValues({ samplesToReplace: dataSet, algorithmConfiguration: fullConfiguration });
  return rawGrowTree(readyToGoDataSet, fullConfiguration);
};


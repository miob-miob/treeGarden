import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';
import { TreeGardenConfiguration } from './algorithmConfiguration';
import { consistentDataSetGuard, continuousAttributesGuard, TreeGardenDataSample } from './dataSet/set';
import { rawGrowTree } from './rawGrowTree';


export const growTree = (algorithmConfiguration:TreeGardenConfiguration, dataSet:TreeGardenDataSample[]) => {
  if (!algorithmConfiguration.buildTime) {
    throw new Error('You cannot use just partial configuration in "growTree" function, build it with "buildAlgorithmConfiguration"');
  }
  consistentDataSetGuard(dataSet, 'growTree');

  continuousAttributesGuard(algorithmConfiguration, dataSet, 'growTree');
  const readyToGoDataSet = getDataSetWithReplacedValues({ samplesToReplace: dataSet, algorithmConfiguration: algorithmConfiguration });
  return rawGrowTree(readyToGoDataSet, algorithmConfiguration);
};


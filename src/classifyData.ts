import { DataSetSample } from './dataSet/set';
import { AlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { TreeGardenNode } from './treeNode';
import { getDataSetWithReplacedValues } from './dataSet/replaceMissingValues';

type SampleWithoutClass = Omit<DataSetSample, '_class'>;

export const getLeafNodesForSamples = (
  samplesToClassify:SampleWithoutClass[],
  decisionTreeRoot:TreeGardenNode,
  algorithmConfiguration:AlgorithmConfiguration,
  referenceDataSetForReplacing?:DataSetSample[]
) => {
  const readyDataSet = (referenceDataSetForReplacing && !algorithmConfiguration.replaceMissingValuesWhileEvaluating) ? getDataSetWithReplacedValues({
    replacerFactoryKey: 'evaluateMissingValueReplacement',
    samplesToReplace: samplesToClassify as DataSetSample[],
    algorithmConfiguration,
    referenceDataSet: referenceDataSetForReplacing
  }) : [...samplesToClassify];

  // todo find leaf node for sample
};

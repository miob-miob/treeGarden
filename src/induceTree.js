import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { getDataSetWithReplacedValues } from './utils/dataSet/replaceMissingValues';
import { getAllPossibleSplitCriteriaForDataSet } from './utils/dataSet/split';


const induceTree = (configuration, dataSet) => {
  const fullConfiguration = buildAlgorithmConfiguration(configuration, dataSet);
  const readyToGoDataSet = getDataSetWithReplacedValues(dataSet, fullConfiguration);

  // todo lets recursive splitting happen
  // todo calculte all posible splits in  getAllPossibleSplitCriteriaForDataSet
  // todo get possible split criteria ;)  and gooo :)
};

// move this to treeNode
const dataSetToTreeNode = (dataSet, configuration, parentNode) => {
  // todo already used splits
  const possibleSplits = getAllPossibleSplitCriteriaForDataSet();
};



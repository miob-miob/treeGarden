import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
import { getDataSetWithReplacedValues } from './utils/dataSet/replaceMissingValues';


const induceTree = (configuration, dataSet) => {
  const fullConfiguration = buildAlgorithmConfiguration(configuration, dataSet);
  const readyToGoDataSet = getDataSetWithReplacedValues(dataSet, fullConfiguration);

  // todo lets recursive splitting happen
  // todo calculte all posible splits in  getAllPossibleSplitCriteriaForDataSet
  // todo get possible split criteria ;)  and gooo :)
};


//const dataSetIntoTreeNodes = ()=>{}



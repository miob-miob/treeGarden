import { PartialAlgorithmConfiguration } from './buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from '../impurity/gini';


export const cartConfig:PartialAlgorithmConfiguration = {
  onlyBinarySplits: true,
  getScoreForSplit: getGiniIndexForSplit,
  biggerScoreBetterSplit: false
};

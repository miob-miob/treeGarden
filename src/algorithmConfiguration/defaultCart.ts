import { PartialAlgorithmConfiguration } from './buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from '../impurity/gini';


export const cartConfig:PartialAlgorithmConfiguration = {
  onlyBinarySplits: true,
  impurityScoringForSplit: getGiniIndexForSplit,
  biggerImpurityScoreBetterSplit: false
};

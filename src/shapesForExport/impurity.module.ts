import { getInformationGainForSplit, getInformationGainRatioForSplit } from '../impurity/entropy';
import { getGiniIndexForSplit } from '../impurity/gini';
import { getScoreForRegressionTreeSplit } from '../impurity/regressionTreeScore';

export {
  getInformationGainRatioForSplit,
  getInformationGainForSplit,
  getGiniIndexForSplit,
  getScoreForRegressionTreeSplit
};

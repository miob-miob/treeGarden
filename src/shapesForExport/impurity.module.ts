import { getInformationGainForSplit, getInformationGainRatioForSplit } from '../impurity/entropy';
import { getGiniIndexForSplit } from '../impurity/gini';
import { getScoreForRegressionTreeSplit } from '../impurity/regressionTreeScore';

export {
  getInformationGainRatioForSplit, // bigger score - better split
  getInformationGainForSplit, // bigger score - better split
  getGiniIndexForSplit, // lower score - better split
  getScoreForRegressionTreeSplit // lower score - better split
};

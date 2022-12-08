/**
 * This namespace holds various functions useful for basic statistics and analysis of trees and forests
 * @module
 */


import {
  getArithmeticAverage, getMedian, getStandardDeviation, getVariance
} from '../statistic/basicStatistic';
import {
  getMissClassificationRate,
  getMissClassificationRateRaw,
  getNumberOfSamplesInNode, getNumberOfTreeNodes,
  getRAbsError,
  getRAbsErrorRaw, getTreeDepth
} from '../statistic/treeStats';
import { getOutOfTheBagError } from '../statistic/randomForestStats';
import { getMostCommonValue, getMostCommonValues } from '../statistic/getMostCommonValue';

export {
  // basic statistic
  getMedian,
  getArithmeticAverage,
  getMostCommonValue,
  getMostCommonValues,
  getStandardDeviation,
  getVariance,

  // accuracy of trees
  getMissClassificationRate,
  getMissClassificationRateRaw,
  getRAbsError,
  getRAbsErrorRaw,

  // tree statistics
  getNumberOfSamplesInNode,
  getNumberOfTreeNodes,
  getTreeDepth,

  // random forests statistics
  getOutOfTheBagError

};

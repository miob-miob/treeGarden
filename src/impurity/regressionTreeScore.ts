/* eslint-disable no-underscore-dangle */
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getArithmeticAverage } from '../statistic/basicStatistic';


type ImpurityScoringFn = TreeGardenConfiguration['getScoreForSplit'];

/**
 * Split quality scoring function for **regression** trees
 *
 * It is based on sum of residuals, residual is distance of particular value from average value **tree-garden** uses absolute
 * distance, not squared. Lower sum means that values are closer together - data set is more pure.
 * @remarks
 * lower score - better split!!!
 */
export const getScoreForRegressionTreeSplit :ImpurityScoringFn = (parentDataSet, childDataSets, config, splitter) => {
  const averages = Object.fromEntries(
    Object.entries(childDataSets)
      .map(([value, dataSet]) => [
        value, getArithmeticAverage(dataSet.map((sample) => sample._class as number))
      ])
  );
  return parentDataSet.reduce((residual, currentSample) => {
    const tagOfSample = splitter(currentSample);
    return residual + Math.abs(averages[tagOfSample] - (currentSample._class as number));
  }, 0);
};

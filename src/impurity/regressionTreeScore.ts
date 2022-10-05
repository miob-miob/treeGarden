/* eslint-disable no-underscore-dangle */
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getArithmeticAverage } from '../statistic/basicStatistic';


type ImpurityScoringFn = TreeGardenConfiguration['getScoreForSplit'];
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

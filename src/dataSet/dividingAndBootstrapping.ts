/* eslint-disable no-underscore-dangle */
import { chooseOne, shuffleArray } from '../randomization';
import { TreeGardenDataSample } from './set';
import { enrichDataSetWithUniqueIds } from './enrichDataSetWithUniqueIds';

/**
 * Function that randomly distributes samples of data set into two data sets.
 * @param portionGoesToFirst portion of samples that will go to first one, rest goes to second one 0 - 1
 * @example
 * ```ts
 * // 70% goes to training, rest to validation
 * const [trainingDataSet,validationDataSet] = getDividedSet(originalDataSet,0.7)
 * ```
 */
export const getDividedSet = (dataSet:TreeGardenDataSample[], portionGoesToFirst = 0.5) => {
  const firstSet:TreeGardenDataSample[] = [];
  const secondSet:TreeGardenDataSample[] = [];
  dataSet.forEach((sample) => {
    if (Math.random() < portionGoesToFirst) {
      firstSet.push(sample);
    } else {
      secondSet.push(sample);
    }
  });

  return [firstSet, secondSet];
};

/**
 * Implementation of [bootstrap aggregating](https://en.wikipedia.org/wiki/Bootstrap_aggregating) for random forests.
 * It randomly pulls samples from original data set, samples can repeat. There should be around 63.2% unique samples, rest are copies
 * @param howMany if not defined, same amount as length of original data set is returned.
 * @return {TreeGardenDataSample[]}
 */
export const getBootstrappedDataSet = (dataSet:TreeGardenDataSample[], howMany?:number) => {
  const readyHowMany = howMany || dataSet.length;
  return Array.from(Array(readyHowMany)).map(() => chooseOne(dataSet));
};

/**
 * Function, that returns bootstrapped data sample and also out of the bag sample ids in Set.
 * If samples of data set do not have their own unique `_id`, they are generated.
 * @param howMany if not defined, same amount as length of original data set is returned.
 */
export const getBootstrappedDataSetAndOutOfTheBagRest = (dataSet: TreeGardenDataSample[], howMany?:number) => {
  enrichDataSetWithUniqueIds(dataSet);
  const outOfBagSet = new Set(dataSet.map((sample) => sample._id));
  const bootstrappedDataSet = Array.from(Array(howMany ?? dataSet.length)).map(() => {
    const sample = chooseOne(dataSet);
    outOfBagSet.delete(sample._id);
    return sample;
  });
  return [bootstrappedDataSet, outOfBagSet] as const;
};

/**
 * Function that will return data sets for cross validation. If you set `kFold` on data sample length-1, you will run
 * [leave one out cross validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics)#Leave-one-out_cross-validation)
 * @param kFold how many data sets should be generated.
 */
export const getKFoldCrossValidationDataSets = (dataSet:TreeGardenDataSample[], kFold = 10) => {
  if (dataSet.length < kFold) {
    throw new Error(`You can not divide ${dataSet.length} samples into ${kFold} partitions!!!`);
  }
  const shuffledDataSet = shuffleArray(dataSet);
  const partitions: TreeGardenDataSample[][] = [...Array(kFold).keys()].map(() => []);
  while (shuffledDataSet.length > 0) {
    partitions.forEach((currentPartition) => {
      const sample = shuffledDataSet.pop();
      if (sample) {
        currentPartition.push(sample);
      }
    });
  }
  return partitions.map((partition, index) => {
    const copy = [...partitions];
    const validation = copy.splice(index, 1)[0];
    return { validation, training: copy.flat() };
  });
};

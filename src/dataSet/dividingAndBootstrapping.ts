/* eslint-disable no-underscore-dangle */
import { chooseOne, shuffleArray } from '../randomization';
import { TreeGardenDataSample } from './set';
import { enrichDataSetWithUniqueIds } from './enrichDataSetWithUniqueIds';

// this is useful when i need training and validation data set
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

// sampling with replacement
export const getBootstrappedDataSet = (dataSet:TreeGardenDataSample[], howMany?:number) => {
  const readyHowMany = howMany || dataSet.length;
  return Array.from(Array(readyHowMany)).map(() => chooseOne(dataSet));
};

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

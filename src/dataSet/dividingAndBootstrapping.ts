import { chooseOne, shuffleArray } from '../randomization';
import { DataSetSample } from './set';

// this is useful when i need training and validation data set
export const getDividedSet = (dataSet:DataSetSample[], portionGoesToFirst = 0.5) => {
  const firstSet:DataSetSample[] = [];
  const secondSet:DataSetSample[] = [];
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
export const getBootstrappedDataSet = (dataSet:DataSetSample[], howMany?:number) => {
  const readyHowMany = howMany || dataSet.length;
  const bootstrappedSet = [];
  for (let counter = 0; counter < readyHowMany; counter += 1) {
    bootstrappedSet.push(chooseOne(dataSet));
  }
  return bootstrappedSet;
};

export const getNFoldCrossValidationDataSets = (dataSet:DataSetSample[], nFold = 10) => {
  if (dataSet.length < nFold) {
    throw new Error(`You can not divide ${dataSet.length} samples into ${nFold} partitions!!!`);
  }
  const shuffledDataSet = shuffleArray(dataSet);
  const partitions: DataSetSample[][] = [...Array(nFold).keys()].map(() => []);
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

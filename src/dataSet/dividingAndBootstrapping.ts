import { chooseOne } from '../randomization';
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

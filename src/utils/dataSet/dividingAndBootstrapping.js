import { chooseOne } from '../randomization';

// this is useful when i need training and validation data set
export const getDividedSet = (dataSet, portionGoesToFirst = 0.5) => {
  const firstSet = [];
  const secondSet = [];
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
export const getBootstrappedDataSet = (dataSet, howMany) => {
  const readyHowMany = howMany || dataSet.length;
  const bootstrappedSet = [];
  for (let counter = 0; counter < readyHowMany; counter += 1) {
    bootstrappedSet.push(chooseOne(dataSet));
  }
  return bootstrappedSet;
};

/* eslint-disable no-underscore-dangle,no-param-reassign */

export const getEntropyOfDataSet = (dataSetObj) => {
  const classes = Array.from(new Set(dataSetObj.map((item) => item._class)));

  const classesFrequencies = dataSetObj.reduce((result, currentItem) => {
    const itemClass = currentItem._class;
    result[itemClass] = result[itemClass] ? result[itemClass] += 1 : result[itemClass] = 1;
    return result;
  }, {});

  return classes.reduce((result, currentClass) => {
    const classProbability = classesFrequencies[currentClass] / dataSetObj.length;
    return result - classProbability * (Math.log2(classProbability));
  }, 0);
};

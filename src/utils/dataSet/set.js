/* eslint-disable no-underscore-dangle */

// todo implement metadata around set
// todo for data types in columns description

export const getClassesOfDataSet = (dataSet, alreadyKnownClasses = null) => {
  const classesSet = dataSet
    .reduce(
      (allKnownClasses, currentSample) => {
        if (!allKnownClasses.has(currentSample._class)) {
          allKnownClasses.add(currentSample._class);
        }
        return allKnownClasses;
      },
      new Set(alreadyKnownClasses || [])
    );
  return Array.from(classesSet);
};

/**
 *
 * @param {Array<object>} dataSet
 * @param {Array<string>} knownClasses all known classes in data set
 * @return {Object} @example {playTennis:7:dontPlayTennis:3} frequencies of classes in dataset
 */
export const getFrequenciesOfClasses = (dataSet, knownClasses) => {
  const counts = Object.fromEntries(knownClasses.map((classId) => ([classId, 0])));
  return dataSet.reduce((overallCounts, currentSample) => {
    // eslint-disable-next-line no-param-reassign
    overallCounts[currentSample._class] += 1;
    return overallCounts;
  }, counts);
};

/* eslint-disable no-underscore-dangle */


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

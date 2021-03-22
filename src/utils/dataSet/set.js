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


export const getAllAttributeIds = (dataSet) => {
  const resultSet = new Set();
  dataSet.forEach((sample) => {
    Object.keys(sample)
      .filter((key) => key[0] !== '_') // filter out _label and _class
      .forEach((key) => {
        if (!resultSet.has(key)) {
          resultSet.add(key);
        }
      });
  });

  return [...resultSet];
};

// decide if values under given attributeId of dataset are continuous or discrete
export const getTypeOfAttribute = (dataSet, attributeId, missingValue = undefined) => {
  const allValuesAreNumbers = dataSet.map((sample) => sample[attributeId])
    .filter((value) => value !== missingValue) // filter out missing values
    .every((value) => typeof value === 'number');
  return allValuesAreNumbers ? 'continuous' : 'discrete';
};


export const getAllValuesOfAttribute = (attributeId, dataSet) => dataSet.map((sample) => sample[attributeId]);
export const getAllUniqueValuesOfAttribute = (attributeId, dataSet) => [...new Set(getAllValuesOfAttribute(attributeId, dataSet))];

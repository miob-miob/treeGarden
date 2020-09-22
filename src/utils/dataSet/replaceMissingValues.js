/* eslint-disable no-underscore-dangle */
import { getMostCommonValues } from '../statistic/getMostCommonValue';
import { chooseOne } from '../randomization';
import { getClassesOfDataSet } from './set';


// closure WARNING :D FF stands for Function Factory
// eslint-disable-next-line no-unused-vars
export const getMostCommonValueFF = (dataSet, attributeId) => (sampleWithMissingValue) => {
  const valuesForGivenAttribute = dataSet
    .filter((sample) => sample[attributeId] !== undefined)
    .map((sample) => sample[attributeId]);
  if (valuesForGivenAttribute.length === 0) {
    throw new Error(`There is no values for attribute:'${attributeId}' - probably invalid attribute!`);
  }
  // in case there is more than one most common value, choose one by random
  return chooseOne(getMostCommonValues(valuesForGivenAttribute));
};

// closure WARNING :D FF stands for Function Factory
export const getMostCommonValueAmongSameClassFF = (dataSet, attributeId) => {
  const allClassesOfDataSet = getClassesOfDataSet(dataSet);
  const classesAndCommonValuesForGivenAttributeId = {};
  allClassesOfDataSet.forEach((currentClass) => {
    const partitionValues = dataSet
      .filter((sample) => sample._class === currentClass && sample[attributeId] !== undefined)
      .map((sample) => sample[attributeId]);
    if (partitionValues.length !== 0) {
      classesAndCommonValuesForGivenAttributeId[currentClass] = chooseOne(getMostCommonValues(partitionValues));
    }
  });
  return (sampleWithMissingValue) => {
    if (!classesAndCommonValuesForGivenAttributeId[sampleWithMissingValue._class]) {
      throw new Error(`
      There are no value for attribute '${attributeId}' among samples with class: '${sampleWithMissingValue._class}'!
      Use different method for replacement of missing values or discard sample entirely!
      `);
    }
    return classesAndCommonValuesForGivenAttributeId[sampleWithMissingValue._class];
  };
};

/* eslint-disable no-underscore-dangle */
import { getMostCommonValues } from '../statistic/getMostCommonValue';
import { chooseOne } from '../randomization';
import { getClassesOfDataSet } from './set';
import { getMedian } from '../statistic/getMedian';


// closure WARNING :D FF stands for Function Factory - on algorithm start it is called
// and replacer is created (just once) than used for every sample with missing value
// eslint-disable-next-line no-unused-vars
export const getMostCommonValueFF = (dataSet, attributeId, configuration) => {
  const typeOfAttribute = configuration.attributes[attributeId].dataType;
  const { missingValue } = configuration.attributes[attributeId];
  const valuesForGivenAttribute = dataSet
    .filter((sample) => (sample[attributeId] !== undefined && sample[attributeId] !== missingValue))
    .map((sample) => sample[attributeId]);
  if (valuesForGivenAttribute.length === 0) {
    throw new Error(`There is no values for attribute:'${attributeId}' - probably invalid attribute!`);
  }

  let mostCommonValues = null;
  let median = null;
  if (typeOfAttribute === 'discrete') {
    mostCommonValues = getMostCommonValues(valuesForGivenAttribute);
  } else {
    median = getMedian(valuesForGivenAttribute);
  }
  // in case there is more than one most common value, choose one by random
  return (sampleWithMissingValue) => {
    if (typeOfAttribute === 'discrete') {
      return chooseOne(mostCommonValues);
    }
    return median;
  };
};

// closure WARNING :D FF stands for Function Factory
export const getMostCommonValueAmongSameClassFF = (dataSet, attributeId, configuration) => {
  const allClassesOfDataSet = getClassesOfDataSet(dataSet);
  const classesAndCommonValuesForGivenAttributeId = {};
  const attributeDataType = configuration.attributes[attributeId].dataType;
  const { missingValue } = configuration.attributes[attributeId];
  allClassesOfDataSet.forEach((currentClass) => {
    const partitionValues = dataSet
      .filter((sample) => sample._class === currentClass && sample[attributeId] !== undefined && sample[attributeId] !== missingValue)
      .map((sample) => sample[attributeId]);
    if (partitionValues.length !== 0) {
      classesAndCommonValuesForGivenAttributeId[currentClass] = (attributeDataType === 'discrete')
        ? chooseOne(getMostCommonValues(partitionValues)) : getMedian(partitionValues);
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

// this will create copy of dataSet which is then used for induction
export const getDataSetWithReplacedValues = (dataSet, algorithmConfiguration) => {
  // cash replacers because if replacer is build it will iterate whole dataset
  const replacerHash = {};
  const getReplacer = (attributeId) => {
    if (!replacerHash[attributeId]) {
      replacerHash[attributeId] = algorithmConfiguration.attributes[attributeId].induceMissingValueReplacement(dataSet, attributeId, algorithmConfiguration);
    }
    return replacerHash[attributeId];
  };
  const usedAttributes = Object.keys(algorithmConfiguration.attributes);
  return dataSet.map((sample) => {
    const sampleCopy = {};
    let foundMissingValue = false;
    usedAttributes.forEach((attributeId) => {
      const { missingValue } = algorithmConfiguration.attributes[attributeId];
      if (sample[attributeId] === missingValue) {
        foundMissingValue = true;
        sampleCopy[attributeId] = getReplacer(attributeId)(sample);
      }
    });
    // sample copy was populated - we will need create full sample copy
    if (foundMissingValue) {
      return { ...sample, ...sampleCopy };
    }
    return sample;
  });
};

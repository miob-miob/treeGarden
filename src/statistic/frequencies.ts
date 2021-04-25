/* eslint-disable no-underscore-dangle */


import { DataSetSample } from '../dataSet/set';

/**
 *
 * @param {Array<object>} dataSet
 * @param {Array<string>} knownClasses all known classes in data set
 * @return {Object} @example {playTennis:7:dontPlayTennis:3} frequencies of classes in dataset
 */
export const getFrequenciesOfClasses = (dataSet:DataSetSample[], knownClasses:string[]) => {
  const counts = Object.fromEntries(knownClasses.map((classId) => ([classId, 0])));
  return dataSet.reduce((overallCounts, currentSample) => {
    // eslint-disable-next-line no-param-reassign
    overallCounts[currentSample._class!] += 1;
    return overallCounts;
  }, counts);
};

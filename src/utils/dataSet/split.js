/* eslint-disable no-underscore-dangle */
import { existingValueGuard } from './sample';

const supportedMathOperators = new Set([
  '==',
  '>=',
  '<=',
  '>',
  '<'
]);

const supportedOperators = new Set(['customFn', ...supportedMathOperators]);


/**
 * Factory function that returns function that accepts sample and decides what is its tag for splitting
 * @param {string} attributeId which attribute from sample use
 * @param {string} operator
 * @param value {Array<string|number>|string|function|number} depends on operator
 * @return {function(object): string|boolean}
 */
export const getSplitCriteriaFn = (attributeId, operator, value = undefined) => {
  if (operator === '==') {
    return (currentSample) => {
      // value is present ==> boolean - binary split
      if (value) {
        return Array.isArray(value) ? value.includes(currentSample[attributeId]) : currentSample[attributeId] === value;
      }
      // no value => value of given sample
      existingValueGuard(currentSample, attributeId);
      return currentSample[attributeId];
    };
  }
  if (operator === 'customFn') {
    if (typeof (value) !== 'function') {
      throw new Error(`When using custom function as operator, value must be function, got '${value}'!`);
    }
    // value is custom function, which is provided with sample and attributeId
    // should return split tag
    return (currentSample) => value(currentSample, attributeId);
  }
  if (supportedMathOperators.has(operator)) {
    return (currentSample) => {
      existingValueGuard(currentSample, attributeId);
      const attributeValue = currentSample[attributeId];
      if (typeof (attributeValue) === 'number') {
        throw new Error(`${currentSample._label} value for attribute ${attributeId} should be number, got '${attributeValue}'!`);
      }
      if (typeof (value) === 'number') {
        throw new Error(`'value' for math operators should be number, got '${value}'!`);
      }
      switch (operator) {
        case '>':
          return attributeValue > value;
        case '>=':
          return attributeValue >= value;
        case '<':
          return attributeValue < value;
        case '<=':
          return attributeValue <= value;
        default:
          throw new Error('This should never happen!');
      }
    };
  }

  throw new Error(`Used unknown operator, supported operators are: ${supportedOperators}, got '${operator}'!`);
};

// todo implement we have needed helpers
/**
 * function that splits data set according given criteria;
 * @param {Array<object>} dataSet
 * @param {function(object):string|boolean} splitCriteriaFn function that produces tag of given sample
 * @return {*}
 */
export const splitDataSet = (dataSet, splitCriteriaFn) => {
  const tagsAndSamples = dataSet.reduce(
    (result, currentSample) => {
      const tagOfSample = splitCriteriaFn(currentSample).toString();
      if (!result[tagOfSample]) {
        // eslint-disable-next-line no-param-reassign
        result[tagOfSample] = [];
      }
      result[tagOfSample].push(currentSample);
      return result;
    },
    {}
  );
  return tagsAndSamples;
};

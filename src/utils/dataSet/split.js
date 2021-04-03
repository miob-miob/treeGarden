/* eslint-disable no-underscore-dangle */
import { existingValueGuard } from './sample';
import { getFrequenciesOfClasses } from '../statistic/frequencies';
import { getAllUniqueValuesOfAttribute } from './set';

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
      if (typeof (attributeValue) !== 'number') {
        throw new Error(`${currentSample._label} value for attribute '${attributeId}' should be number, got '${attributeValue}'!`);
      }
      if (typeof (value) !== 'number') {
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


export const splitDataSet = (dataSet, splitCriteriaFn, onlyBinarySplits) => {
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
  if (onlyBinarySplits && Object.keys(tagsAndSamples).length > 2) {
    throw new Error(`Only binary splits allowed, but there are more than 2 keys in result split - ${Object.keys(tagsAndSamples)}`);
  }
  return tagsAndSamples;
};

/**
 *
 * @param {Array<Object>} dataSet
 * @param {function(Object):string|Boolean} splitCreiteriaFn
 * @param {Array<string>} knownClasses
 * @param {function(Array<number>,Array<Array<number>>):number} scoringFunction
 * @param {Boolean} onlyBinarySplits
 * @return {number}
 */
export const getScoreForGivenSplitCriteria = (dataSet, splitCreiteriaFn, knownClasses, scoringFunction, onlyBinarySplits) => {
  const parentFrequencies = Object.values(getFrequenciesOfClasses(dataSet, knownClasses));
  const childDataSets = splitDataSet(dataSet, splitCreiteriaFn, onlyBinarySplits);
  const childFrequencies = Object.values(childDataSets)
    .map((childSet) => Object.values(getFrequenciesOfClasses(childSet, knownClasses)));
  return scoringFunction(parentFrequencies, childFrequencies);
};

/**
 *
 * @param {Array<any>} values
 * @param {number} maxElements
 * @param {Array<Array<any>>}[combinationsFromPreviousStep]
 * @param {number} [currentElements]
 * @return {Array<Array<any>>}
 */
export const getCombinationsWithoutRepeats = (values, maxElements, combinationsFromPreviousStep, currentElements) => {
  let newCombinationsArray;
  let curElements;
  if (!combinationsFromPreviousStep || !currentElements) {
    newCombinationsArray = values.map((item) => [item]);
    newCombinationsArray.sort();
    curElements = 1;
  } else {
    curElements = currentElements;
    const newlyDiscoveredUniqueCombinations = {};
    for (let combinationIndex = 0; combinationIndex < combinationsFromPreviousStep.length; combinationIndex += 1) {
      for (let valueIndex = 0; valueIndex < values.length; valueIndex += 1) {
        const value = values[valueIndex];
        const previousCombination = combinationsFromPreviousStep[combinationIndex];

        // we want only combinations of unique items, that we didnt find b4
        if (!previousCombination.includes(value)) {
          const newCombination = [...previousCombination, value];
          // we do not want to store combinations just with other order
          newCombination.sort();
          const combinationId = newCombination.join('$');
          if (!newlyDiscoveredUniqueCombinations[combinationId]) {
            newlyDiscoveredUniqueCombinations[combinationId] = newCombination;
          }
        }
      }
    }
    newCombinationsArray = Object.values(newlyDiscoveredUniqueCombinations);
  }
  if (curElements >= maxElements) {
    return newCombinationsArray;
  }
  return [...newCombinationsArray, ...getCombinationsWithoutRepeats(values, maxElements, newCombinationsArray, curElements + 1)];
};

export const getAllPossibleSplitCriteriaForCategoricalValues = (attributeId, values) => getCombinationsWithoutRepeats(values, values.length - 1)
  .map((combination) => [attributeId, '==', combination]);

export const getAllPossibleSplitCriteriaForContinuousValues = (attributeId, values) => {
  const valuesCopy = [...values];
  valuesCopy.sort((a, b) => a - b);
  const result = [];
  for (let valueIndex = 0; valueIndex < valuesCopy.length; valueIndex += 1) {
    const currentValue = valuesCopy[valueIndex];
    const nextValue = valuesCopy[valueIndex + 1];

    // values are not same and we are not on end of array
    if (valueIndex + 1 < valuesCopy.length && currentValue !== nextValue) {
      result.push([attributeId, '>', (currentValue + nextValue) / 2]);
    }
  }
  return result;
};


export const getPossibleSpitCriteriaForDiscreteAttribute = (attributeId, dataSet, configuration) => {
  const uniqueValues = getAllUniqueValuesOfAttribute(attributeId, dataSet);
  if (configuration.onlyBinarySplits) {
    return getAllPossibleSplitCriteriaForCategoricalValues(attributeId, uniqueValues);
  }
  return [[attributeId, '==']];
};

// eslint-disable-next-line no-unused-vars
export const getPossibleSpitCriteriaForContinuousAttribute = (attributeId, dataSet, configuration) => {
  const uniqueValues = getAllUniqueValuesOfAttribute(attributeId, dataSet);
  return getAllPossibleSplitCriteriaForContinuousValues(attributeId, uniqueValues);
};


const areSplitCriteriaSame = (splitCriteriaOne, splitCriteriaTwo) => {
  if (splitCriteriaOne[0] !== splitCriteriaTwo[0] || splitCriteriaOne[1] !== splitCriteriaTwo[1]) {
    return false;
  }

  // in case of undefined
  const lastMemberOne = splitCriteriaOne[2] ?? '';
  const lastMemberTwo = splitCriteriaTwo[2] ?? '';
  if (typeof lastMemberOne !== typeof lastMemberTwo) {
    return false;
  }

  // eslint-disable-next-line no-unused-expressions
  lastMemberTwo?.sort?.();
  // eslint-disable-next-line no-unused-expressions
  lastMemberOne?.sort?.();

  return lastMemberOne.toString() === lastMemberTwo.toString();
};

// todo TESTS!!!
// splitCriteriaAlreadyUsed - array of splits - which is array like [['color', '==', ['green','red','blue],[next...]]
export const getAllPossibleSplitCriteriaForDataSet = (dataSet, configuration, splitCriteriaAlreadyUsed) => {
  const possibleSplitCriteria = Object.entries(configuration.attributes).flatMap(
    ([attributeId, {
      dataType,
      getAllPossibleSplitCriteriaForDiscreteAttribute,
      getAllPossibleSplitCriteriaForContinuousAttribute
    }]) => ((dataType === 'discrete') ? getAllPossibleSplitCriteriaForDiscreteAttribute(attributeId, dataSet, configuration)
      : getAllPossibleSplitCriteriaForContinuousAttribute(attributeId, dataSet, configuration))
  );
  return possibleSplitCriteria
    .filter((splitCriteria) => {
      let isNotAmongUsed = true;
      splitCriteriaAlreadyUsed
        .forEach((alreadyUsedSplit) => {
          if (areSplitCriteriaSame(splitCriteria, alreadyUsedSplit)) {
            isNotAmongUsed = false;
          }
        });
      return isNotAmongUsed;
    });
};

export const getBestScoringSplits = (dataSet, possibleSplits, algorithmConfig) => {
  const splitsWithScore = possibleSplits.map((splitDefinition) => {
    const splitter = getSplitCriteriaFn(...splitDefinition);
    const score = getScoreForGivenSplitCriteria(
      dataSet,
      splitter,
      algorithmConfig.allClasses,
      algorithmConfig.impurityScoringForSplit,
      algorithmConfig.onlyBinarySplits
    );
    return { split: splitDefinition, score };
  });

  const comparator = algorithmConfig.biggerImpurityScoreBetterSplit ? (a, b) => b.score - a.score : (a, b) => a.score - b.score;
  return splitsWithScore
    .sort(comparator)
    .slice(0, algorithmConfig.numberOfSplitsKept);
};

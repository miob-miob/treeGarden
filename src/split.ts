/* eslint-disable no-underscore-dangle */
import { existingValueGuard } from './dataSet/sample';
import { TreeGardenDataSample, getAllUniqueValuesOfAttribute } from './dataSet/set';
import { TreeGardenConfiguration } from './algorithmConfiguration';


const supportedMathOperators = new Set([
  '==',
  '>=',
  '<=',
  '>',
  '<'
] as const);


const supportedOperators = new Set([
  ...supportedMathOperators,
  'customFn'
] as const);

export type SplitOperator = typeof supportedOperators extends Set<infer K>?K:never;
export type SplitCriteriaFn = ReturnType<typeof getSplitCriteriaFn>;
export type SplitCriteriaDefinition = any[];

/**
 * Factory function that returns function that accepts sample and decides what is its tag for splitting
 */
export const getSplitCriteriaFn = (attributeId:string, operator:SplitOperator, value?:Array<string|number>|string|Function|number) => {
  if (operator === '==') {
    return (currentSample:TreeGardenDataSample) => {
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
    return (currentSample:TreeGardenDataSample) => value(currentSample, attributeId);
  }
  if (supportedMathOperators.has(operator)) {
    return (currentSample:TreeGardenDataSample) => {
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

export const splitDataSet = (dataSet:TreeGardenDataSample[], splitCriteriaFn: SplitCriteriaFn, onlyBinarySplits:boolean) => {
  const tagsAndSamples = dataSet.reduce(
    (result:{ [key:string]:TreeGardenDataSample[] }, currentSample) => {
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

export const getCombinationsWithoutRepeats = (
  values: any[],
  maxElements: number,
  combinationsFromPreviousStep?:any[][],
  currentElements?:number
):any[][] => {
  let newCombinationsArray:any[][];
  let curElements: number;
  if (!combinationsFromPreviousStep || !currentElements) {
    newCombinationsArray = values.map((item) => [item]);
    newCombinationsArray.sort();
    curElements = 1;
  } else {
    curElements = currentElements;
    const newlyDiscoveredUniqueCombinations:{ [key:string]:any[] } = {};
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

export const getAllPossibleSplitCriteriaForCategoricalValues = (
  attributeId:string, values:any[]
):SplitCriteriaDefinition[] => getCombinationsWithoutRepeats(values, values.length - 1)
  .map((combination) => [attributeId, '==', combination]);

export const getAllPossibleSplitCriteriaForContinuousValues = (attributeId:string, values:any[]) => {
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

export const getPossibleSpitCriteriaForDiscreteAttribute = (
  attributeId:string,
  dataSet:TreeGardenDataSample[],
  configuration: { [key:string]:any } // this any is because cyclic dependency when inferring algorithmconfig
):SplitCriteriaDefinition[] => {
  const uniqueValues = getAllUniqueValuesOfAttribute(attributeId, dataSet);
  if (configuration.onlyBinarySplits) {
    return getAllPossibleSplitCriteriaForCategoricalValues(attributeId, uniqueValues);
  }
  return [[attributeId, '==']];
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPossibleSpitCriteriaForContinuousAttribute = (attributeId:string, dataSet:TreeGardenDataSample[], configuration:{ [key:string]:any }) => {
  const uniqueValues = getAllUniqueValuesOfAttribute(attributeId, dataSet);
  return getAllPossibleSplitCriteriaForContinuousValues(attributeId, uniqueValues);
};


const areSplitCriteriaSame = (splitCriteriaOne:SplitCriteriaDefinition, splitCriteriaTwo:SplitCriteriaDefinition) => {
  if (splitCriteriaOne[0] !== splitCriteriaTwo[0] || splitCriteriaOne[1] !== splitCriteriaTwo[1]) {
    return false;
  }

  // in case of undefined
  const lastMemberOne = splitCriteriaOne[2] ?? '';
  const lastMemberTwo = splitCriteriaTwo[2] ?? '';
  if (typeof lastMemberOne !== typeof lastMemberTwo) {
    return false;
  }
  // @ts-ignore
  lastMemberTwo?.sort?.();
  // @ts-ignore
  lastMemberOne?.sort?.();

  return lastMemberOne.toString() === lastMemberTwo.toString();
};

// splitCriteriaAlreadyUsed - array of splits - which is array like [['color', '==', ['green','red','blue],[next...]]
export const getAllPossibleSplitCriteriaForDataSet = (
  dataSet:TreeGardenDataSample[],
  configuration:{ [key:string]:any },
  splitCriteriaAlreadyUsed:SplitCriteriaDefinition[]
): SplitCriteriaDefinition[] => {
  const possibleSplitCriteria = Object.entries(configuration.attributes).flatMap(
    ([attributeId, {
      // @ts-expect-error because we cannot use algorithm config type here (used for infer config - cyclic dependency)
      dataType,
      // @ts-expect-error
      getAllPossibleSplitCriteriaForDiscreteAttribute,
      // @ts-expect-error
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

export const getBestScoringSplits = (dataSet:TreeGardenDataSample[], possibleSplits:SplitCriteriaDefinition[], algorithmConfig:TreeGardenConfiguration) => {
  const splitsWithScore = possibleSplits.map((splitDefinition) => {
    // @ts-expect-error
    const splitter = getSplitCriteriaFn(...splitDefinition);
    const childDataSets = splitDataSet(dataSet, splitter, algorithmConfig.onlyBinarySplits);

    const score = algorithmConfig.getScoreForSplit(dataSet, childDataSets, algorithmConfig, splitter);
    return { split: splitDefinition, score };
  });

  // @ts-expect-error
  const comparator = algorithmConfig.biggerScoreBetterSplit ? (a, b) => b.score - a.score : (a, b) => a.score - b.score;
  return splitsWithScore
    .sort(comparator)
    .slice(0, algorithmConfig.numberOfSplitsKept);
};

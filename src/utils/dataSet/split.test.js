import {
  getCombinationsWithoutRepeats,
  getAllPossibleSplitCriteriaForCategoricalValues,
  getAllPossibleSplitCriteriaForContinuousValues, getAllPossibleSplitCriteriaForDataSet
} from './split';

import { simple } from '../../sampleDataSets';
import { buildAlgorithmConfiguration } from '../../algorithmConfiguration/buildAlgorithmConfiguration';


test('getCombinationsWithoutRepeats', () => {
  const expectedResult = [
    ['a'], ['b'], ['c'],
    ['a', 'b'], ['b', 'c'], ['a', 'c'],
    ['a', 'b', 'c']
  ];
  const result = getCombinationsWithoutRepeats(['a', 'b', 'c'], 3);
  expect(result).toEqual(expect.arrayContaining(expectedResult));
  expect(result.length).toBe(expectedResult.length);
});


test('getAllPossibleSplitCriteriaForCategoricalValues', () => {
  const attrId = 'color';
  const values = ['blue', 'green', 'red'];
  const expectedResult = [
    [attrId, '==', ['blue']],
    [attrId, '==', ['red']],
    [attrId, '==', ['green']],
    [attrId, '==', ['blue', 'red']],
    [attrId, '==', ['blue', 'green']],
    [attrId, '==', ['green', 'red']]
  ];
  const result = getAllPossibleSplitCriteriaForCategoricalValues(attrId, values);
  expect(result).toEqual(expect.arrayContaining(expectedResult));
  expect(result.length).toBe(expectedResult.length);
});


test('getAllPossibleSplitCriteriaForNumericalValues', () => {
  const attrId = 'size';
  const values = [11.5, 0, 0, 2, 2, 5, 5, 11];
  const expectedResult = [
    [attrId, '>', 1],
    [attrId, '>', 3.5],
    [attrId, '>', 8],
    [attrId, '>', 11.25]
  ];
  const result = getAllPossibleSplitCriteriaForContinuousValues(attrId, values);
  expect(result).toEqual(expect.arrayContaining(expectedResult));
  expect(result.length).toBe(expectedResult.length);
});


test('getAllPossibleSplitCriteriaForDataSet', () => {
  const dataSet = simple;
  const defaultConffig = buildAlgorithmConfiguration({}, dataSet);
  const expectedPossibleSplits = [
    ['size', '>', 2.5],
    ['size', '>', 3.5],
    ['color', '==']
  ];
  const expectedSPlitsWithIgnoredOne = expectedPossibleSplits.slice();
  expectedSPlitsWithIgnoredOne.splice(1, 1);
  const possibleSplits = getAllPossibleSplitCriteriaForDataSet(dataSet, defaultConffig, []);
  possibleSplits.sort();
  const possibleSplitsIgnoreUsed = getAllPossibleSplitCriteriaForDataSet(dataSet, defaultConffig, [['size', '>', 3.5]]);
  possibleSplitsIgnoreUsed.sort();
  expect(possibleSplits).toEqual(expectedPossibleSplits.sort());
  expect(possibleSplitsIgnoreUsed).toEqual(expectedSPlitsWithIgnoredOne.sort());
});

test('getAllPossibleSplitCriteriaForDataSet for only binary splits ', () => {
  const dataSet = simple;
  const conf = buildAlgorithmConfiguration({ onlyBinarySplits: true }, dataSet);
  const expectedSplits = [
    ['size', '>', 2.5],
    ['size', '>', 3.5],
    ['color', '==', ['black']],
    ['color', '==', ['white']]
  ];
  const producedSplits = getAllPossibleSplitCriteriaForDataSet(dataSet, conf, []).sort();
  expect(producedSplits).toEqual(expectedSplits.sort());
});

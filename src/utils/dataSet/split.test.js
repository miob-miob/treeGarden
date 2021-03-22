import { getCombinationsWithoutRepeats, getAllPossibleSplitCriteriaForCategoricalValues, getAllPossibleSplitCriteriaForContinuousValues } from './split';


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

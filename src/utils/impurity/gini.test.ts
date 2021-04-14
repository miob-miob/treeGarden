import { getGiniIndex, getGiniIndexForDataSet, getGiniIndexForSplit } from './gini';
import { simple } from '../../sampleDataSets';
import { getClassesOfDataSet } from '../dataSet/set';
import { getScoreForGivenSplitCriteria, getSplitCriteriaFn } from '../dataSet/split';


const knownClasses = getClassesOfDataSet(simple);
test('getGiniIndex', () => {
  expect(getGiniIndex([0, 0, 5])).toBeCloseTo(0);
  expect(getGiniIndex([3, 3, 3])).toBeCloseTo(1 - 3 / 9);
  expect(getGiniIndex([3, 3])).toBeCloseTo(0.5);
});


test('getGiniIndexForDataSet', () => {
  expect(getGiniIndexForDataSet(simple, knownClasses)).toBeCloseTo(1 - (4 / 25 + 9 / 25));
});

test('getGiniIndexForSplit', () => {
  expect(getGiniIndexForSplit([5, 5], [[1, 8], [0, 1]]))
    .toBeCloseTo((9 / 10) * (1 - (1 / 81 + 64 / 81)));
});

test('getGiniIndexForSplitCriteria', () => {
  const splitFn = getSplitCriteriaFn('color', '==');
  expect(getScoreForGivenSplitCriteria(
    simple,
    splitFn,
    knownClasses,
    getGiniIndexForSplit,
    false
  ))
    .toBeCloseTo(0);
});

import { getGiniIndex, getGiniIndexForDataSet, getGiniIndexForSplit } from './gini';
import { simple } from '../sampleDataSets';
import { getClassesOfDataSet } from '../dataSet/set';
import { getSplitCriteriaFn, splitDataSet } from '../dataSet/split';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';


const knownClasses = getClassesOfDataSet(simple);
const simpleConfig = buildAlgorithmConfiguration(simple, { getScoreForSplit: getGiniIndexForSplit });

test('getGiniIndex', () => {
  expect(getGiniIndex([0, 0, 5])).toBeCloseTo(0);
  expect(getGiniIndex([3, 3, 3])).toBeCloseTo(1 - 3 / 9);
  expect(getGiniIndex([3, 3])).toBeCloseTo(0.5);
});


test('getGiniIndexForDataSet', () => {
  expect(getGiniIndexForDataSet(simple, knownClasses)).toBeCloseTo(1 - (4 / 25 + 9 / 25));
});

test('getGiniIndexForSplit', () => {
  const parentSet = [
    { _class: 'left' },
    { _class: 'left' },
    { _class: 'left' },
    { _class: 'left' },
    { _class: 'left' },
    { _class: 'right' },
    { _class: 'right' },
    { _class: 'right' },
    { _class: 'right' },
    { _class: 'right' }
  ];
  const childSets = {
    splitValueOne: [
      { _class: 'left' },
      { _class: 'left' },
      { _class: 'left' },
      { _class: 'left' },
      { _class: 'left' },
      { _class: 'left' },
      { _class: 'left' },
      { _class: 'left' },
      { _class: 'right' }
    ],
    splitValueTwo: [
      { _class: 'left' }
    ]
  };
  expect(getGiniIndexForSplit(parentSet, childSets, simpleConfig, () => {}))
    .toBeCloseTo((9 / 10) * (1 - (1 / 81 + 64 / 81)));
});

test('getGiniIndexForSplit', () => {
  const splitFn = getSplitCriteriaFn('color', '==');

  expect(getGiniIndexForSplit(
    simple,
    splitDataSet(simple, splitFn, false),
    simpleConfig,
    splitFn
  ))
    .toBeCloseTo(0);
});

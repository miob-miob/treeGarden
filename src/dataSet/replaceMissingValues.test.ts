import {
  getMostCommonValueFF,
  getMostCommonValueAmongSameClassFF,
  getDataSetWithReplacedValues
} from './replaceMissingValues';
import { simple } from '../sampleDataSets';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';


const configuration = buildAlgorithmConfiguration(simple, {});
test('getMostCommonValueFF continuous', () => {
  const replacer = getMostCommonValueFF(simple, 'size', configuration);
  expect(replacer({ _class: 'left' })).toBe(3);
});

test('getMostCommonValueFF discrete', () => {
  const replacer = getMostCommonValueFF(simple, 'color', configuration);
  expect(replacer({ _class: 'left' })).toBe('white');
  expect(replacer({ _class: 'right' })).toBe('white');
});


test('getMostCommonValueAmongSameClassFF continuous', () => {
  const replacer = getMostCommonValueAmongSameClassFF(simple, 'size', configuration);
  expect(replacer({ _class: 'left' })).toBeCloseTo(3.5);
  expect(replacer({ _class: 'right' })).toBeCloseTo(2);
});

test('getMostCommonValueAmongSameClassFF discrete', () => {
  const replacer = getMostCommonValueAmongSameClassFF(simple, 'color', configuration);
  expect(replacer({ _class: 'left' })).toBe('black');
  expect(replacer({ _class: 'right' })).toBe('white');
});

test('getDataSetWithReplacedValues', () => {
  const dataSet = [
    { _class: 'one', weight: 55, color: 'blue' },
    { _class: 'one', weight: 40, color: 'blue' },
    { _class: 'one', weight: 33, color: 'red' },
    { _class: 'one', weight: 20, color: 'x' },
    { _class: 'one', weight: 60, color: 'x' },
    { _class: 'one', weight: 'z', color: 'x' }
  ];
  const config = buildAlgorithmConfiguration(dataSet, { missingValue: 'x', attributes: { weight: { missingValue: 'z' } } });
  expect(getDataSetWithReplacedValues(dataSet, config)).toStrictEqual([
    { _class: 'one', weight: 55, color: 'blue' },
    { _class: 'one', weight: 40, color: 'blue' },
    { _class: 'one', weight: 33, color: 'red' },
    { _class: 'one', weight: 20, color: 'blue' },
    { _class: 'one', weight: 60, color: 'blue' },
    { _class: 'one', weight: 40, color: 'blue' }
  ]);
});


test('getDataSetWithReplacedValues with undefined missing values', () => {
  const dataSet = [
    { _class: 'one', weight: 55, color: 'blue' },
    { _class: 'one', weight: 40, color: 'blue' },
    { _class: 'one', weight: 33, color: 'red' },
    { _class: 'one', weight: 20 },
    { _class: 'one', weight: 60 },
    { _class: 'one' }
  ];
  expect(getDataSetWithReplacedValues(dataSet, buildAlgorithmConfiguration(dataSet, undefined))).toStrictEqual([
    { _class: 'one', weight: 55, color: 'blue' },
    { _class: 'one', weight: 40, color: 'blue' },
    { _class: 'one', weight: 33, color: 'red' },
    { _class: 'one', weight: 20, color: 'blue' },
    { _class: 'one', weight: 60, color: 'blue' },
    { _class: 'one', weight: 40, color: 'blue' }
  ]);
});

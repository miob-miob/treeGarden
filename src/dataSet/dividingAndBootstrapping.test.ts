import { getBootstrappedDataSet, getDividedSet, getKFoldCrossValidationDataSets } from './dividingAndBootstrapping';
import { tennisSet } from '../sampleDataSets';

const buildDataSet = (nItems: number) => Array.from(Array(nItems))
  .map((item, index) => ({ value: index, _class: 'someClass' }));

test('getBootstrappedDataSet', () => {
  const howMany = 99;
  const dataSet = buildDataSet(howMany);
  expect(getBootstrappedDataSet(dataSet).length).toBe(howMany);
  const nMany = 150;
  expect(getBootstrappedDataSet(dataSet, nMany).length).toBe(nMany);
});

test('getDividedSet', () => {
  const nItems = 2000;
  const validationSetPortion = 0.2;
  const set = buildDataSet(nItems);
  const [validation, training] = getDividedSet(set, validationSetPortion);
  expect(validation.length / set.length).toBeCloseTo(validationSetPortion, 1);
  expect(training.length / set.length).toBeCloseTo(1 - validationSetPortion, 1);
  expect(validation.length + training.length).toBe(nItems);
});

test('getNFoldCrossValidationDataSets', () => {
  const folds = 13;
  const crossValidationSamples = getKFoldCrossValidationDataSets(tennisSet, folds);
  expect(crossValidationSamples.length).toBe(folds);
  const sums = crossValidationSamples.map(({ validation, training }) => training.length + validation.length);
  const uniqueSums = Array.from(new Set(sums));
  expect(uniqueSums.length).toBe(1);
  expect(uniqueSums[0]).toBe(14);
});

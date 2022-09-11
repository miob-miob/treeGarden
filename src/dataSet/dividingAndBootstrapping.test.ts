/* eslint-disable no-underscore-dangle */
import {
  getBootstrappedDataSet, getBootstrappedDataSetAndOutOfTheBagRest, getDividedSet, getKFoldCrossValidationDataSets
} from './dividingAndBootstrapping';
import { tennisSet } from '../sampleDataSets';
import { TreeGardenDataSample } from './set';

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

test('getBootstrappedDataSetAndOutOfTheBagRest', () => {
  const length = 100;
  const dataSet = Array.from(Array(length)).map((item, index) => ({ _label: index, _id: index })) as TreeGardenDataSample[];
  const [bootstrapped, oobSet] = getBootstrappedDataSetAndOutOfTheBagRest(dataSet);
  expect(bootstrapped.length > oobSet.size).toBeTruthy();
  const shouldBeEmpty = bootstrapped.filter((item) => oobSet.has(item._id));
  expect(shouldBeEmpty.length).toBe(0);
});

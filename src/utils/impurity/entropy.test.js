// @ts-ignore
import { simple } from '../../sampleDataSets';
import { getInformationGainForSplitCriteria, getEntropyOfDataSet } from './entropy';
import { getClassesOfDataSet } from '../dataSet/set';
import { getSplitCriteriaFn } from '../dataSet/split';


const knownClasses = getClassesOfDataSet(simple);
const entropyOfSimpleDataSet = getEntropyOfDataSet(simple, knownClasses);

test('getClassesOfDataSet', () => {
  const manuallyCalculatedEntropy = -((2 / 5) * Math.log2(2 / 5) + (3 / 5) * Math.log2(3 / 5));
  expect(entropyOfSimpleDataSet).toBeCloseTo(manuallyCalculatedEntropy);
});
test('getInformationGainForSplitCriteria', () => {
  const splitCriteriaFn = getSplitCriteriaFn('color', '==');
  expect(getInformationGainForSplitCriteria(simple, splitCriteriaFn, knownClasses)).toBeCloseTo(entropyOfSimpleDataSet);
});

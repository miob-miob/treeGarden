import { simple } from '../../sampleDataSets';
import {
  getEntropyForDataSet, getInformationGainForSplit, getEntropy, getInformationGainRatioForSplit
} from './entropy';
import { getClassesOfDataSet } from '../dataSet/set';
import { getScoreForGivenSplitCriteria, getSplitCriteriaFn } from '../dataSet/split';


const knownClasses = getClassesOfDataSet(simple);
const entropyOfSimpleDataSet = getEntropyForDataSet(simple, knownClasses);

test('getEntropyOfDataSet', () => {
  const manuallyCalculatedEntropy = -((2 / 5) * Math.log2(2 / 5) + (3 / 5) * Math.log2(3 / 5));
  expect(entropyOfSimpleDataSet).toBeCloseTo(manuallyCalculatedEntropy);
});

test('getInformationGain', () => {
  const rootFrequencies = [10, 10];
  const branchA = [1, 4];
  const branchB = [7, 8];
  const rootEntropy = getEntropy(rootFrequencies);
  const branchAEntropy = getEntropy(branchA);
  const branchBEntropy = getEntropy(branchB);
  expect(getInformationGainForSplit(rootFrequencies, [branchA, branchB]))
    .toBeCloseTo(rootEntropy - ((5 / 20) * branchAEntropy + (15 / 20) * branchBEntropy));
});

test('getInformationGainForSplitCriteria', () => {
  const splitCriteriaFn = getSplitCriteriaFn('color', '==');
  expect(getScoreForGivenSplitCriteria(simple, splitCriteriaFn, knownClasses, getInformationGainForSplit,false)).toBeCloseTo(entropyOfSimpleDataSet);
});


test('getInformationGainRatio', () => {
  const rootFrequencies = [10, 10];
  const branchA = [1, 4];
  const branchB = [7, 8];

  const infoGain = getInformationGainForSplit(rootFrequencies, [branchA, branchB]);
  const splitInfo = getEntropy([5, 15]);
  expect(getInformationGainRatioForSplit(rootFrequencies, [branchA, branchB]))
    .toBeCloseTo(infoGain / splitInfo);
});

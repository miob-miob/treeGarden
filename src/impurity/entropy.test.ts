import { simpleSet } from '../sampleDataSets';
import {
  getEntropyForDataSet, getInformationGainForSplit, getEntropy, getInformationGainRatioForSplit
} from './entropy';
import { getClassesOfDataSet } from '../dataSet/set';
import { getSplitCriteriaFn, splitDataSet } from '../split';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';


const knownClasses = getClassesOfDataSet(simpleSet);
const entropyOfSimpleDataSet = getEntropyForDataSet(simpleSet, knownClasses);

test('getEntropyOfDataSet', () => {
  const manuallyCalculatedEntropy = -((2 / 5) * Math.log2(2 / 5) + (3 / 5) * Math.log2(3 / 5));
  expect(entropyOfSimpleDataSet).toBeCloseTo(manuallyCalculatedEntropy);
});

test('getInformationGain', () => {
  const simpleConfig = buildAlgorithmConfiguration(simpleSet, { getScoreForSplit: getInformationGainRatioForSplit });
  const rootFrequencies = [10, 10];
  const rootDataSet = [
    ...Array.from(Array(rootFrequencies[0]).keys())
      .map((_item) => ({ _class: 'left' })),
    ...Array.from(Array(rootFrequencies[1]).keys())
      .map((_item) => ({ _class: 'right' }))
  ];

  const branchA = [1, 4];
  const branchADataSet = [
    ...Array.from(Array(branchA[0]).keys())
      .map((_item) => ({ _class: 'left' })),
    ...Array.from(Array(branchA[1]).keys())
      .map((_item) => ({ _class: 'right' }))
  ];
  const branchB = [7, 8];
  const branchBDataSet = [
    ...Array.from(Array(branchB[0]).keys())
      .map((_item) => ({ _class: 'left' })),
    ...Array.from(Array(branchB[1]).keys())
      .map((_item) => ({ _class: 'right' }))
  ];
  const rootEntropy = getEntropy(rootFrequencies);
  const branchAEntropy = getEntropy(branchA);
  const branchBEntropy = getEntropy(branchB);
  expect(getInformationGainForSplit(rootDataSet, { something: branchADataSet, somethingOther: branchBDataSet }, simpleConfig, () => {}))
    .toBeCloseTo(rootEntropy - ((5 / 20) * branchAEntropy + (15 / 20) * branchBEntropy));
});

test('getInformationGain', () => {
  const simpleConfig = buildAlgorithmConfiguration(simpleSet, { getScoreForSplit: getInformationGainRatioForSplit });
  const splitCriteriaFn = getSplitCriteriaFn('color', '==');
  expect(getInformationGainForSplit(simpleSet, splitDataSet(simpleSet, splitCriteriaFn, false), simpleConfig, splitCriteriaFn)).toBeCloseTo(entropyOfSimpleDataSet);
});


test('getInformationGainRatio', () => {
  const simpleConfig = buildAlgorithmConfiguration(simpleSet, { getScoreForSplit: getInformationGainRatioForSplit });
  const rootFrequencies = [10, 10];
  const rootDataSet = [
    ...Array.from(Array(rootFrequencies[0]).keys())
      .map((_item) => ({ _class: 'left' })),
    ...Array.from(Array(rootFrequencies[1]).keys())
      .map((_item) => ({ _class: 'right' }))
  ];

  const branchA = [1, 4];
  const branchADataSet = [
    ...Array.from(Array(branchA[0]).keys())
      .map((_item) => ({ _class: 'left' })),
    ...Array.from(Array(branchA[1]).keys())
      .map((_item) => ({ _class: 'right' }))
  ];
  const branchB = [7, 8];
  const branchBDataSet = [
    ...Array.from(Array(branchB[0]).keys())
      .map((_item) => ({ _class: 'left' })),
    ...Array.from(Array(branchB[1]).keys())
      .map((_item) => ({ _class: 'right' }))
  ];

  const infoGain = getInformationGainForSplit(rootDataSet, { something: branchADataSet, other: branchBDataSet }, simpleConfig, () => {});
  const splitInfo = getEntropy([5, 15]);
  expect(getInformationGainRatioForSplit(rootDataSet, { something: branchADataSet, other: branchBDataSet }, simpleConfig, () => {}))
    .toBeCloseTo(infoGain / splitInfo);
});

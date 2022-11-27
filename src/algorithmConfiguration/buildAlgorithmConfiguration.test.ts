import { buildAlgorithmConfiguration } from './buildAlgorithmConfiguration';


const testSet = [
  { _class: 'first', age: 18, _label: 'Label one' },
  { _class: 'second', age: 19, _label: 'Label two' },
  { _class: 'first', age: 18, _label: 'label three' },
  { _class: 'first', age: '', _label: 'label four' }
];


test('buildAlgorithmConfiguration.test.ts', () => {
  // proper set missing value - sample is skipped and data type should be 'continuous'
  const configWithContinuousAge = buildAlgorithmConfiguration(testSet, { missingValue: '' });

  // age is incorrectly guessed as 'discrete because default missing value is undefined
  const configWithDiscreteAge = buildAlgorithmConfiguration(testSet);

  expect(configWithContinuousAge.attributes.age.dataType).toBe('continuous');
  expect(configWithDiscreteAge.attributes.age.dataType).toBe('discrete');
});


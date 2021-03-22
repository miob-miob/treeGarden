import { buildAttributesConfiguration, keysInheritedFromAlgorithmConfigurationIfNotDefined } from './buildAttributesConfiguration';
import { tennisSet } from '../sampleDataSets';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
import { defaultConfiguration } from './algorithmDefaultConfiguration';


const defaultWithDiscrete = {
  ...defaultAttributeConfiguration,
  dataType: 'discrete',
  ...Object.fromEntries(keysInheritedFromAlgorithmConfigurationIfNotDefined
    .map((key) => [key, defaultConfiguration[key]]))
};

test('default of tennis set', () => {
  expect(buildAttributesConfiguration(defaultConfiguration, tennisSet)).toStrictEqual({
    outlook: defaultWithDiscrete,
    temp: defaultWithDiscrete,
    humidity: defaultWithDiscrete,
    wind: defaultWithDiscrete
  });
});

test('changed humidity field', () => {
  expect(buildAttributesConfiguration({
    ...defaultConfiguration,
    attributes: { humidity: { dataType: 'numeric' } }
  }, tennisSet))
    .toStrictEqual({
      outlook: defaultWithDiscrete,
      temp: defaultWithDiscrete,
      humidity: { ...defaultWithDiscrete, dataType: 'numeric' },
      wind: defaultWithDiscrete
    });
});

test('include just humidity and wind', () => {
  expect(buildAttributesConfiguration({
    ...defaultConfiguration,
    includedAttributes: ['humidity', 'wind']
  }, tennisSet)).toStrictEqual({
    humidity: defaultWithDiscrete,
    wind: defaultWithDiscrete
  });
});


test('determine numeric data type', () => {
  const testSet = [
    { _class: 'first', age: 18, _label: 'Label one' },
    { _class: 'second', age: 19, _label: 'Label two' },
    { _class: 'first', age: 18, _label: 'label three' }
  ];

  expect(buildAttributesConfiguration(defaultConfiguration, testSet).age.dataType).toBe('continuous');
});

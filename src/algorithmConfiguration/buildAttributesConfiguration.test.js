import { buildAttributesConfiguration } from './buildAttributesConfiguration';
import { tennisSet } from '../sampleDataSets';
import { defaultAttributeConfiguration } from './attibuteDefaultConfiguration';
import { defaultConfiguration } from './algorithmDefaultConfiguration';

test('default of tennis set', () => {
  expect(buildAttributesConfiguration(defaultConfiguration, tennisSet)).toStrictEqual({
    outlook: defaultAttributeConfiguration,
    temp: defaultAttributeConfiguration,
    humidity: defaultAttributeConfiguration,
    wind: defaultAttributeConfiguration
  });
});

test('changed humidity field', () => {
  expect(buildAttributesConfiguration({
    ...defaultConfiguration,
    attributes: { humidity: { dataType: 'numeric' } }
  }, tennisSet))
    .toStrictEqual({
      outlook: defaultAttributeConfiguration,
      temp: defaultAttributeConfiguration,
      humidity: { ...defaultAttributeConfiguration, dataType: 'numeric' },
      wind: defaultAttributeConfiguration
    });
});

test('include just humidity and wind', () => {
  expect(buildAttributesConfiguration({
    ...defaultConfiguration,
    includedAttributes: ['humidity', 'wind']
  })).toStrictEqual({
    humidity: defaultAttributeConfiguration,
    wind: defaultAttributeConfiguration
  });
});

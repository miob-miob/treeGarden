import { buildAlgorithmConfiguration } from '../algorithmConfiguration';
import { TreeGardenDataSample, continuousAttributesGuard } from './set';


const dataSet : TreeGardenDataSample[] = [
  { _class: 'one', weight: '31' },
  { _class: 'one', weight: '32' },
  { _class: 'two', weight: '33' }
];
test('continuousAttributesGuard', () => {
  const algorithmConfig = buildAlgorithmConfiguration(dataSet, {
    attributes: {
      weight: { dataType: 'continuous' }
    }
  });
  continuousAttributesGuard(algorithmConfig, dataSet);
  expect(dataSet.map((sample) => sample.weight)).toEqual([31, 32, 33]);
  dataSet.push({ _class: 'two', weight: 'i am not number' });
  expect(() => { continuousAttributesGuard(algorithmConfig, dataSet); }).toThrowError();
});

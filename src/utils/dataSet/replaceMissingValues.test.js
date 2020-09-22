import { getMostCommonValueFF, getMostCommonValueAmongSameClassFF } from './replaceMissingValues';
import { simple } from '../../sampleDataSets';

test('get most common value for entire set', () => {
  const replacer = getMostCommonValueFF(simple, 'color');
  expect(replacer({ _class: 'left' })).toBe('white');
});

test('get most common value for entire set', () => {
  const replacer = getMostCommonValueAmongSameClassFF(simple, 'color');
  expect(replacer({ _class: 'left' })).toBe('black');
  expect(replacer({ _class: 'right' })).toBe('white');
});

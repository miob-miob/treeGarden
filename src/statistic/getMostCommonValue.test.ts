import { getMostCommonValues } from './getMostCommonValue';

const values = ['a', 'a', 'b', 'c', 'd', 'd'];
test('getMostCommon', () => {
  expect(getMostCommonValues(values.slice(0, 4))).toEqual(['a']);
});
test('getTwoMostCommon', () => {
  expect(getMostCommonValues(values)).toEqual(['a', 'd']);
});

test('throws error when some value is not string', () => {
  const crippledValuesOne = ['a', 'b', 'c', 1];
  const crippledValuesTwo = ['a', 'b', 'c', null];
  const crippledValuesThree = ['a', 'b', 'c', undefined];
  const crippledValuesFour = ['a', 'b', 'c', ''];
  // @ts-expect-error
  expect(() => getMostCommonValues(crippledValuesOne)).toThrow(Error);
  // @ts-expect-error
  expect(() => getMostCommonValues(crippledValuesTwo)).toThrow(Error);
  // @ts-expect-error
  expect(() => getMostCommonValues(crippledValuesThree)).toThrow(Error);
  expect(() => getMostCommonValues(crippledValuesFour)).toThrow(Error);
});


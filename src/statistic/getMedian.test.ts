import { getMedian } from './getMedian';


test('median of odd array', () => {
  expect(getMedian([22, 3, 2, 4, 5])).toBe(4);
});

test('median of even array', () => {
  expect(getMedian([22, 3, 2, 4])).toBeCloseTo(3.5);
});

test('median of array of length one', () => {
  expect(getMedian([4])).toBe(4);
});

test('median of empty array throws error', () => {
  expect(() => getMedian([])).toThrow();
});

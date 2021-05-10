import { medianAndAverage } from './medianAndAverage';


test('median of odd array', () => {
  expect(medianAndAverage([22, 3, 2, 4, 5])).toBe(4);
});

test('median of even array', () => {
  expect(medianAndAverage([22, 3, 2, 4])).toBeCloseTo(3.5);
});

test('median of array of length one', () => {
  expect(medianAndAverage([4])).toBe(4);
});

test('median of empty array throws error', () => {
  expect(() => medianAndAverage([])).toThrow();
});

import { getMedian, getStandardDeviation, getVariance } from './basicStatistic';


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

test('variance of empty array throws error', () => {
  expect(() => getVariance([])).toThrow();
});

test('getVariance', () => {
  const values = [5, 2, 6, 4, 3];
  // const mean = 4; //  20/5
  const summedDiffsFromMeanSquered = [1, 4, 4, 0, 1].reduce((acc, current) => acc + current, 0);

  expect(getVariance(values)).toBeCloseTo(summedDiffsFromMeanSquered / values.length);
});

test('getStandardDeviation', () => {
  const values = [1, 5, 12, 8, 0, 4];
  expect(getStandardDeviation(values)).toBeCloseTo(Math.sqrt(getVariance(values)));
});
